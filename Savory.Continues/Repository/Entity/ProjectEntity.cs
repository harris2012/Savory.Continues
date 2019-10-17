using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Savory.Continues.Repository.Entity
{
    public class ProjectEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Repository { get; set; }

        public string TemplateName { get; set; }

        public string Params { get; set; }

        public int DataStatus { get; set; }

        public string CreateBy { get; set; }

        public DateTime CreateTime { get; set; }

        public string LastUpdateBy { get; set; }

        public DateTime LastUpdateTime { get; set; }
    }
}