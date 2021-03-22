using Microsoft.AspNetCore.Mvc;
using SpotOps.Models;

namespace SpotOps.ResponseModels
{
    public class SpotGetResponse
    {
        public Spot Spot { get; set; }

        public FileStreamResult File { get; set; }
        
    }
}