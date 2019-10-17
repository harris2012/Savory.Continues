using Newtonsoft.Json;
using Savory.Continues.Vo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Savory.Continues.Response
{
    public class ProjectItemsResponse : ResponseBase
    {
        [JsonProperty("projects")]
        public List<ProjectVo> ProjectList { get; set; }
    }
}
