using Microsoft.AspNetCore.Http;

namespace SpotOps.ResponseModels
{
    public class SpotResponse
    {
        public string Name { get; set; }
        
        public string Type { get; set; }

        public string FileName { get; set; }
        
        public IFormFile FormFile { get; set; }
        
    }
}