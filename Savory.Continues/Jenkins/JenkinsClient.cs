using Newtonsoft.Json;
using Savory.Continues;
using Savory.Continues.Jenkins;
using Savory.Continues.Jenkins.Request;
using Savory.Continues.Jenkins.Response;
using Savory.Utility.WebClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Savory.Jenkins
{
    public class JenkinsClient
    {
        public string GetJenkinsCrumb()
        {
            SavoryWebClient client = new SavoryWebClient();
            client.Host = $"{GlobalVariables.JenkinsHost}/crumbIssuer/api/json";
            client.HttpMethod = Utility.WebClient.HttpMethod.Get;
            client.SerializeMode = SerializeMode.Json;
            client.Authorization = "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(GlobalVariables.JenkinsUserId + ":" + GlobalVariables.JenkinsApiToken));
            var response = client.Request<CrumbResponse>();

            return response.Crumb;
        }

        public void Build(string jobName, BuildRequest request)
        {
            SavoryWebClient client = new SavoryWebClient();
            client.Host = $"{GlobalVariables.JenkinsHost}/job/{jobName}/build";
            client.HttpMethod = Utility.WebClient.HttpMethod.Post;
            client.Authorization = "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(GlobalVariables.JenkinsUserId + ":" + GlobalVariables.JenkinsApiToken));
            client.ContentType = "application/x-www-form-urlencoded";

            request.JenkinsCrumb = GetJenkinsCrumb();
            client.Content = "json=" + JsonConvert.SerializeObject(request);

            var content = client.RequestForString();
        }
    }
}
