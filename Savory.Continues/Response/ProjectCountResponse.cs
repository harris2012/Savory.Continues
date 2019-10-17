using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Savory.Continues.Response
{
    public class ProjectCountResponse : ResponseBase
    {
        [JsonProperty("totalCount")]
        public int TotalCount { get; set; }
    }
}