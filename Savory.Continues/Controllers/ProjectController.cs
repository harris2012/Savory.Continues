using Newtonsoft.Json;
using Savory.Continues.Response;
using Savory.Continues.Vo;
using Savory.Continues.Request;
using Dapper;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Savory.Continues.Repository.Entity;

namespace Savory.Continues.Controllers
{
    public class ProjectController : ApiController
    {
        private readonly int PageSize = 15;

        [HttpPost]
        public ProjectItemsResponse Items(ProjectItemsRequest request)
        {
            ProjectItemsResponse response = new ProjectItemsResponse();

            request.PageIndex = request.PageIndex < 1 ? 1 : request.PageIndex;

            List<ProjectEntity> entityList = null;
            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                entityList = sqliteConn.Query<ProjectEntity>("select * from project order by id desc limit @PageStart, @PageSize", new { PageStart = (request.PageIndex - 1) * PageSize, @PageSize = PageSize }).ToList();
            }

            if (entityList != null && entityList.Count > 0)
            {
                response.ProjectList = ToVoList(entityList);
            }

            response.Status = 1;
            return response;
        }

        [HttpPost]
        public ProjectItemResponse Item(ProjectItemRequest request)
        {
            ProjectItemResponse response = new ProjectItemResponse();

            ProjectEntity entity = null;
            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                entity = sqliteConn.QueryFirstOrDefault<ProjectEntity>("select * from project where Name = @Name", new { Name = request.name });
            }

            if (entity == null)
            {
                response.Status = 404;
            }

            response.Project = ToVo(entity);
            response.Status = 1;

            return response;
        }

        [HttpPost]
        public ProjectCountResponse Count(ProjectCountRequest request)
        {
            ProjectCountResponse response = new ProjectCountResponse();

            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                response.TotalCount = sqliteConn.QuerySingle<int>("select count(1) from project");
            }

            response.Status = 1;

            return response;
        }

        [HttpPost]
        public ProjectCreateResponse Create(ProjectCreateRequest request)
        {
            ProjectCreateResponse response = new ProjectCreateResponse();

            ProjectEntity entityToInsert = ToEntity(request.Project);

            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                var count = sqliteConn.QuerySingle<int>("select count(1) from project where Name = @Name", new { Name = request.Project.Name });
                if (count > 0)
                {
                    response.Message = "应用名称已存在";
                    return response;
                }
            }

            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                sqliteConn.Execute("insert into project(Name, Description, Repository, Params, TemplateName, DataStatus, CreateBy, CreateTime, LastUpdateBy, LastUpdateTime) values (@Name, @Description, @Repository, @Params, @TemplateName, @DataStatus, @CreateBy, @CreateTime, @LastUpdateBy, @LastUpdateTime)",
                    entityToInsert);
            }

            response.Status = 1;
            return response;
        }

        [HttpPost]
        public ProjectUpdateResponse Update(ProjectUpdateRequest request)
        {
            ProjectUpdateResponse response = new ProjectUpdateResponse();

            ProjectEntity entityToUpdate = ToEntity(request.Project);

            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                sqliteConn.Execute("update project set Description = @Description, Repository = @Repository, Params = @Params, TemplateName = @TemplateName, LastUpdateBy = @LastUpdateBy, LastUpdateTime = @LastUpdateTime where Id = @Id",
                    entityToUpdate);
            }

            response.Status = 1;
            return response;
        }

        private static List<ProjectVo> ToVoList(List<ProjectEntity> entityList)
        {
            var processList = new List<ProjectVo>();

            foreach (var entity in entityList)
            {
                ProjectVo process = ToVo(entity);

                processList.Add(process);
            }

            return processList;
        }

        private static ProjectVo ToVo(ProjectEntity entity)
        {
            var project = new ProjectVo();

            project.Id = entity.Id;
            project.Name = entity.Name;
            project.Description = entity.Description;
            project.Repository = entity.Repository;
            project.DataStatus = entity.DataStatus;
            project.TemplateName = entity.TemplateName;
            if (!string.IsNullOrEmpty(entity.Params))
            {
                project.ParamList = JsonConvert.DeserializeObject<List<ParamVo>>(entity.Params);
            }

            project.CreateBy = entity.CreateBy;
            project.CreateTime = entity.CreateTime;
            project.LastUpdateBy = entity.LastUpdateBy;
            project.LastUpdateTime = entity.LastUpdateTime;

            return project;
        }

        private ProjectEntity ToEntity(ProjectVo process)
        {
            ProjectEntity entity = new ProjectEntity();

            entity.Id = process.Id;
            entity.Name = process.Name;
            entity.Description = process.Description;
            entity.Repository = process.Repository;
            entity.TemplateName = process.TemplateName;
            if (process.ParamList != null && process.ParamList.Count > 0)
            {
                entity.Params = JsonConvert.SerializeObject(process.ParamList);
            }

            entity.DataStatus = 1;
            entity.CreateBy = "HarrisZhang";
            entity.CreateTime = DateTime.Now;
            entity.LastUpdateBy = "HarrisZhang";
            entity.LastUpdateTime = DateTime.Now;

            return entity;
        }
    }
}
