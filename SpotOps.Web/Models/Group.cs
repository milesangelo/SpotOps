using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.Extensions.Hosting.Internal;

namespace SpotOps.Models
{
    public class Group
    {
        /// <summary>
        /// 
        /// </summary>
        public int Id { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DateTime DateCreated { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DateTime DateModified { get; set; }
    }
}