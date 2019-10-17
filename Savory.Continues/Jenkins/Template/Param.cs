using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Savory.Continues.Jenkins.Template
{
    public class Param
    {
        /// <summary>
        /// 参数
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// 默认值
        /// </summary>
        public string DefaultValue { get; set; }

        /// <summary>
        /// 说明
        /// </summary>
        public string Description { get; set; }
    }
}