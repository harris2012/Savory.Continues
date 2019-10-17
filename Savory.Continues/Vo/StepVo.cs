using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Savory.Continues.Vo
{
    public class StepVo
    {
        [JsonProperty("cmd")]
        public string Command { get; set; }
    }
}