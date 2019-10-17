using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Savory.Continues.Jenkins.Request
{
    public class BuildRequest
    {
        [JsonProperty("parameter")]
        public List<BuildParam> ParamList { get; set; }

        [JsonProperty("Jenkins-Crumb")]
        public string JenkinsCrumb { get; set; }
    }
}