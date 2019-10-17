using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Savory.Continues.Jenkins.Response
{
    public class CrumbResponse
    {
        [JsonProperty("crumb")]
        public string Crumb { get; set; }
    }
}