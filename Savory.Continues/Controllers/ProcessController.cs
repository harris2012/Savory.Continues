using Savory.Continues.Vo;
using Savory.Continues.Request;
using Savory.Continues.Response;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Savory.Continues.Repository.Entity;
using Newtonsoft.Json;

namespace Savory.Continues.Controllers
{
    public class ProcessController : ApiController
    {
        private readonly int PageSize = 15;

        [HttpPost]
        public ProcessItemsResponse Items(ProcessItemsRequest request)
        {
            ProcessItemsResponse response = new ProcessItemsResponse();

            request.PageIndex = request.PageIndex < 1 ? 1 : request.PageIndex;

            List<ProcessEntity> entityList = null;
            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                entityList = sqliteConn.Query<ProcessEntity>("select * from process limit @PageStart, @PageSize", new { PageStart = (request.PageIndex - 1) * PageSize, @PageSize = PageSize }).ToList();
            }

            if (entityList != null && entityList.Count > 0)
            {
                response.ProcessList = ToVoList(entityList);
            }

            response.Status = 1;
            return response;
        }

        [HttpPost]
        public ProcessCountResponse Count(ProcessCountRequest request)
        {
            ProcessCountResponse response = new ProcessCountResponse();

            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                response.TotalCount = sqliteConn.QuerySingle<int>("select count(1) from process");
            }

            response.Status = 1;

            return response;
        }

        [HttpPost]
        public ProcessItemResponse Item(ProcessItemRequest request)
        {
            ProcessItemResponse response = new ProcessItemResponse();

            ProcessEntity entity = null;
            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                entity = sqliteConn.QueryFirstOrDefault<ProcessEntity>("select * from process where Name = @Name", new { Name = request.Name });
            }

            if (entity == null)
            {
                response.Status = 404;
                return response;
            }

            response.Process = ToVo(entity);
            response.Status = 1;

            return response;
        }

        [HttpPost]
        public ProcessCreateResponse Create(ProcessCreateRequest request)
        {
            ProcessCreateResponse response = new ProcessCreateResponse();

            ProcessEntity entityToInsert = ToEntity(request.Process);

            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                sqliteConn.Execute("insert into process(Name, Description, Steps, Params, DataStatus, CreateBy, CreateTime, LastUpdateBy, LastUpdateTime) values (@Name, @Description, @Steps, @Params, @DataStatus, @CreateBy, @CreateTime, @LastUpdateBy, @LastUpdateTime)",
                    entityToInsert);
            }

            response.Status = 1;
            return response;
        }

        [HttpPost]
        public ProcessCreateResponse Update(ProcessCreateRequest request)
        {
            ProcessCreateResponse response = new ProcessCreateResponse();

            ProcessEntity entityToUpdate = ToEntity(request.Process);

            using (var sqliteConn = ConnectionProvider.GetSqliteConn())
            {
                sqliteConn.Execute("update process set Description = @Description, Steps = @Steps, Params = @Params, LastUpdateBy = @LastUpdateBy, LastUpdateTime = @LastUpdateTime where Id = @Id", entityToUpdate);
            }

            response.Status = 1;
            return response;
        }

        private static List<ProcessVo> ToVoList(List<ProcessEntity> entityList)
        {
            var processList = new List<ProcessVo>();

            foreach (var entity in entityList)
            {
                ProcessVo process = ToVo(entity);

                processList.Add(process);
            }

            return processList;
        }

        private static ProcessVo ToVo(ProcessEntity entity)
        {
            var process = new ProcessVo();

            process.Id = entity.Id;
            process.Name = entity.Name;
            process.Description = entity.Description;
            process.DataStatus = entity.DataStatus;

            process.StepList = JsonConvert.DeserializeObject<List<StepVo>>(entity.Steps);
            if (!string.IsNullOrEmpty(entity.Params))
            {
                process.ParamList = JsonConvert.DeserializeObject<List<ParamVo>>(entity.Params);
            }

            process.CreateBy = entity.CreateBy;
            process.CreateTime = entity.CreateTime;
            process.LastUpdateBy = entity.LastUpdateBy;
            process.LastUpdateTime = entity.LastUpdateTime;

            return process;
        }

        private ProcessEntity ToEntity(ProcessVo process)
        {
            ProcessEntity entity = new ProcessEntity();

            entity.Id = process.Id;
            entity.Name = process.Name;
            entity.Description = process.Description;
            if (process.StepList != null && process.StepList.Count > 0)
            {
                entity.Steps = JsonConvert.SerializeObject(process.StepList);
            }
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
