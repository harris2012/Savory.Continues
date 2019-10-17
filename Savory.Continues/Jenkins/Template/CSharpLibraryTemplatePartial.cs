using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Savory.Continues.Jenkins.Template
{
    partial class CSharpLibraryTemplate
    {
        public bool SonarQubeEnabled { get; set; }

        public string SonarQubeKey { get; set; }

        public List<string> Cmds { get; set; }

        public List<Param> Params { get; set; }
    }
}