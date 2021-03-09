using System;

namespace SpotOps.Models
{
    public class SpotImage
    {
        /// <summary>
        /// 
        /// </summary>
        public int Id { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        public string PathToFile { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        public string FileName { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        public Spot Spot { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        public string Guid { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        public string ImageType { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string CreatedBy { get; set; }
    }
}