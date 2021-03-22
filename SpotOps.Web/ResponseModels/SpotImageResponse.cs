using Microsoft.AspNetCore.Http;
using SpotOps.Models;

namespace SpotOps.ResponseModels
{
    public class SpotImageResponse
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}