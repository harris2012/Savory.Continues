using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Savory.Continues.Request
{
    public class ProcessItemsRequest : ProcessCountRequest
    {
        public int PageIndex { get; set; }
    }
}