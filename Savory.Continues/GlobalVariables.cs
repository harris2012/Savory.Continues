using Savory.Config.LocalFileConfig;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Savory.Continues
{
    public static class GlobalVariables
    {
        static readonly Config.BasicConfig config = new PropertiesFileConfig(@"D:\HarrisData\SavoryContinuesConfig.properties");

        public static string JenkinsHost { get { return config.GetProperty("JenkinsHost"); } }

        public static string JenkinsUserId { get { return config.GetProperty("JenkinsUserId"); } }

        public static string JenkinsApiToken { get { return config.GetProperty("JenkinsApiToken"); } }

        public static string ScmCredentialsId { get { return config.GetProperty("ScmCredentialsId"); } }

        public static string Workspace { get { return config.GetProperty("Workspace"); } }
    }
}
