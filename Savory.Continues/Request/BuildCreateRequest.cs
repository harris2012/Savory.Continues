using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Savory.Continues.Request
{
    public class BuildCreateRequest
    {
        /// <summary>
        /// 项目名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 版本名称
        /// </summary>
        public string Version { get; set; }

        /// <summary>
        /// 分支
        /// </summary>
        public string Branch { get; set; }
    }
}