using Newtonsoft.Json;
using Savory.Continues.Vo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Savory.Continues.Response
{
    public class ProcessItemResponse : ResponseBase
    {
        [JsonProperty("process")]
        public ProcessVo Process { get; set; }
    }
}