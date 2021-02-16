using Microsoft.AspNetCore.Http;
using SpotOps.Models;

namespace SpotOps.ResponseModels
{
    public class SpotImageResponse
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
        
        public Spot Spot { get; set; }
    }
}