using Newtonsoft.Json;
using Savory.Continues.Jenkins;
using Savory.Continues.Jenkins.Request;
using Savory.Continues.Jenkins.Template;
using Savory.Continues.Repository.Entity;
using Savory.Continues.Request;
using Savory.Continues.Response;
using Savory.Continues.Vo;
using Dapper;
using Savory.Jenkins;
using Savory.Utility.WebClient;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace Savory.Continues.Controllers
{
    public class BuildController : ApiController
    {
        [HttpPost]
        public BuildCreateResponse Create(BuildCreateRequest request)
        {
            BuildCreateResponse response = new BuildCreateResponse();

            if (string.IsNullOrEmpty(request.Name))
            {
                response.Message = "name is required.";
                return response;
            }

            ProjectEntity projectEntity = null;
            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                projectEntity = sqliteConn.QueryFirstOrDefault<ProjectEntity>("select * from project where Name = @Name", new { Name = request.Name });
            }

            if (projectEntity == null)
            {
                response.Message = "app not found";
                return response;
            }

            var buildRequest = new BuildRequest();
            buildRequest.ParamList = new List<BuildParam>();
            buildRequest.ParamList.Add(new BuildParam { Name = "Repository", Value = projectEntity.Repository });
            if (string.IsNullOrEmpty(request.Branch))
            {
                buildRequest.ParamList.Add(new BuildParam { Name = "Branch", Value = "master" });
            }
            else
            {
                buildRequest.ParamList.Add(new BuildParam { Name = "Branch", Value = request.Branch });
            }
            buildRequest.ParamList.Add(new BuildParam { Name = "BuildVersion", Value = request.Version });
            buildRequest.ParamList.Add(new BuildParam { Name = "OutputFolder", Value = Path.Combine(GlobalVariables.Workspace, projectEntity.Name, request.Version) });

            List<ParamVo> paramVos = null;
            if (!string.IsNullOrEmpty(projectEntity.Params))
            {
                paramVos = JsonConvert.DeserializeObject<List<ParamVo>>(projectEntity.Params);

                foreach (var paramVo in paramVos)
                {
                    buildRequest.ParamList.Add(new BuildParam { Name = paramVo.Key, Value = paramVo.Value });
                }
            }

            JenkinsClient jenkinsClient = new JenkinsClient();
            jenkinsClient.Build(projectEntity.Name, buildRequest);

            response.Status = 1;
            return response;
        }

        [HttpPost]
        public BuildSetupResponse Setup(BuildSetupRequest request)
        {
            BuildSetupResponse response = new BuildSetupResponse();

            ProjectVo appVo = null;
            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                appVo = sqliteConn.QueryFirstOrDefault<ProjectVo>("select * from project where Name = @Name", new { Name = request.Name });
                if (appVo == null)
                {
                    response.Message = "app not found";
                    return response;
                }
            }

            ProcessEntity processEntity = null;
            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                processEntity = sqliteConn.QueryFirstOrDefault<ProcessEntity>("select * from process where Name = @Name", new { Name = appVo.TemplateName });
                if (processEntity == null)
                {
                    response.Message = "template not found";
                    return response;
                }
            }

            var process = new CSharpLibraryTemplate();

            var steps = JsonConvert.DeserializeObject<List<StepVo>>(processEntity.Steps);
            process.Cmds = steps.Select(v => v.Command).ToList();

            List<Param> paramList = new List<Param>();
            paramList.Add(new Param { Key = "Repository", Description = "git repository" });
            paramList.Add(new Param { Key = "Branch", Description = "git branch", DefaultValue = "master" });
            paramList.Add(new Param { Key = "BuildVersion", Description = "build version" });
            paramList.Add(new Param { Key = "OutputFolder", Description = "Output Folder" });
            if (!string.IsNullOrEmpty(processEntity.Params))
            {
                var items = JsonConvert.DeserializeObject<List<ParamVo>>(processEntity.Params);
                foreach (var item in items)
                {
                    paramList.Add(new Param { Key = item.Key, DefaultValue = item.DefaultValue, Description = item.Description });
                }
            }

            process.Params = paramList;

            string configXml = process.TransformText();

            SavoryWebClient client = new SavoryWebClient();
            client.Authorization = "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(GlobalVariables.JenkinsUserId + ":" + GlobalVariables.JenkinsApiToken));
            client.HttpMethod = Utility.WebClient.HttpMethod.Post;
            client.Content = configXml;

            client.ContentType = "application/xml";

            if (IsJobExists(appVo.Name))
            {
                client.Host = $"{GlobalVariables.JenkinsHost}/job/{appVo.Name}/config.xml";
            }
            else
            {
                client.Host = $"{GlobalVariables.JenkinsHost}/createItem?name={appVo.Name}";
            }

            response.Message = client.RequestForString();

            response.Status = 1;
            return response;
        }

        private static bool IsJobExists(string name)
        {
            try
            {
                SavoryWebClient client = new SavoryWebClient();
                client.Authorization = "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(GlobalVariables.JenkinsUserId + ":" + GlobalVariables.JenkinsApiToken));
                client.HttpMethod = Utility.WebClient.HttpMethod.Get;
                client.Host = $"{GlobalVariables.JenkinsHost}/job/{name}/config.xml";

                client.RequestForString();

                return true;
            }
            catch (WebException ex)
            {
                var httpWebResponse = (HttpWebResponse)ex.Response;
                if (httpWebResponse.StatusCode == HttpStatusCode.NotFound)
                {
                    return false;
                }

                throw;
            }
        }
    }
}
