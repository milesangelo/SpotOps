using System;
using Microsoft.AspNetCore.Http;

namespace SpotOps.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class Spot
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
        public string CreatedBy { get; set; }

        public string Type { get; set; }
    }
}