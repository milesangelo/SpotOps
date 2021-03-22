using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ExifLib;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpotOps.ResponseModels;
using SpotOps.Data.Spots;

namespace SpotOps.Controllers
{
    [Route("api/images")]
    [ApiController]
    //[Authorize]
    public class SpotImageController : ControllerBase
    {
        public IActionResult Post([FromForm] SpotImageResponse file)
        {
            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    file.FormFile.CopyTo(stream);
                }
                
                // GeoLocation imageLocation = new GeoLocation(file.Latitude, file.Longitude);
                //
                // if (!imageLocation.IsValidCoordinates)
                // {
                //     double[] latitude;
                //     double[] longitude;
                //     
                //     // Grab the image gps information instead.
                //     using (var reader = new ExifReader(path))
                //     {
                //         reader.GetTagValue(ExifTags.GPSLatitude, out latitude);
                //         reader.GetTagValue(ExifTags.GPSLongitude, out longitude);
                //     }
                //     
                //     if (!latitude.IsNullOrEmpty() && !longitude.IsNullOrEmpty())
                //     {
                //         decimal imgLatitudeReal = Convert.ToDecimal(latitude[0] + latitude[1] / 60f + latitude[2] / 3600f);
                //         decimal imgLongitudeReal = Convert.ToDecimal(longitude[0] + longitude[1] / 60f + longitude[2] / 3600f);
                //
                //         imageLocation = new GeoLocation(imgLatitudeReal, imgLongitudeReal);
                //     }
                // }
                //
                // if (!imageLocation.IsValidCoordinates)
                // {
                //     // We still do not have a location for this post...
                //     return StatusCode(StatusCodes.Status500InternalServerError);
                // }

                return StatusCode(StatusCodes.Status201Created);

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var path = Path.Combine(  
                Directory.GetCurrentDirectory(),  
                "wwwroot", "rainbow.jpg");  

            var memory = new MemoryStream();  
            using (var stream = new FileStream(path, FileMode.Open))  
            {  
                await stream.CopyToAsync(memory);  
            }  
            memory.Position = 0;  
            return File(memory, GetContentType(path), Path.GetFileName(path));  
        }
        
        private string GetContentType(string path)  
        {  
            var types = GetMimeTypes();  
            var ext = Path.GetExtension(path).ToLowerInvariant();  
            return types[ext];  
        }  
        
        private Dictionary<string, string> GetMimeTypes()  
        {  
            return new Dictionary<string, string>  
            {  
                {".txt", "text/plain"},  
                {".pdf", "application/pdf"},  
                {".doc", "application/vnd.ms-word"},  
                {".docx", "application/vnd.ms-word"},  
                {".xls", "application/vnd.ms-excel"},  
                {".xlsx", "application/vnd.openxmlformats officedocument.spreadsheetml.sheet"},  
                    {".png", "image/png"},  
                {".jpg", "image/jpeg"},  
                {".jpeg", "image/jpeg"},  
                {".gif", "image/gif"},  
                {".csv", "text/csv"}  
            };  
            } 
    }
}