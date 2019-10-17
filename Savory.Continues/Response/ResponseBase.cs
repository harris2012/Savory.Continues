using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Savory.Continues.Response
{
    public abstract class ResponseBase
    {
        /// <summary>
        /// 标识操作的结果
        /// 0 - 失败
        /// 1 - 成功
        /// </summary>
        [JsonProperty("status")]
        public int Status { get; set; }

        /// <summary>
        /// 返回提示信息
        /// </summary>
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
