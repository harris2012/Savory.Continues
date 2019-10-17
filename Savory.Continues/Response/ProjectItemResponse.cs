using Newtonsoft.Json;
using Savory.Continues.Vo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Savory.Continues.Response
{
    public class ProjectItemResponse : ResponseBase
    {
        [JsonProperty("project")]
        public ProjectVo Project { get; set; }
    }
}