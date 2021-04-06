using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpotOps.ResponseModels;
using System.Threading.Tasks;
using SpotOps.Services;

namespace SpotOps.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("/api/spots")]
    public class SpotsController : ControllerBase
    {
        private ISpotResponseService _service;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="service"></param>
        public SpotsController(ISpotResponseService service)
        {
            _service = service;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _service.GetById(id));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving spot with id={id} from database.");
            }
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("get")]
        public async Task<ActionResult<ICollection<SpotResponse>>> Get()
        {
            try
            {
                return Ok(await _service.GetAsync());
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="spot"></param>
        /// <returns></returns>
        [HttpPost("post")]
        public async Task<ActionResult> Post([FromForm] SpotResponse spot)
        {
            try
            {
                return Ok(_service.Add(spot));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Action method for deleting a spot (and respective images) from current db context.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var isDeleted = await _service.Remove(id);

                if (isDeleted)
                {
                    return Ok();
                }
                
                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="spotResponse"></param>
        /// <returns></returns>
        [HttpPut("update/{id:int}")]
        public IActionResult Put([FromForm] SpotResponse spotResponse)
        {
            // try
            // {
            //     var id = spotResponse.Id;
            //     var spotToEdit = _db.Spots.First(spt => spt.Id == id);
            //     
            //     if (spotToEdit == null)
            //     {
            //         return NotFound($"Spot with id = {id} was not found.");
            //     }
            //
            //     spotToEdit.Name = spotResponse.Name;
            //     spotToEdit.Type = spotResponse.Type;
            //
            //     // Handle copying image to physical location.
            //     if (spotResponse.FormFile != null)
            //     {
            //         try
            //         {
            //             var spotImage = _db.SpotImages.First(img => img.Spot.Id == id);
            //             var fileExtension = Path.GetExtension(spotResponse.FileName);
            //
            //             spotImage.Spot = spotToEdit;
            //             spotImage.PathToFile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            //             spotImage.Guid = Guid.NewGuid().ToString();
            //             spotImage.FileName = spotResponse.FileName;
            //             spotImage.ImageType = fileExtension;
            //             
            //             var path = Path.Combine(spotImage.PathToFile, spotImage.Guid + spotImage.ImageType);
            //             using (Stream stream = new FileStream(path, FileMode.Create))
            //             {
            //                 spotResponse.FormFile.CopyTo(stream);
            //             }
            //         }
            //         catch (Exception ex)
            //         {
            //             return BadRequest();
            //         }
            //     }
            //     
            //     _db.SaveChanges();
            //     
            //     return Ok();
            // }
            // catch (Exception e)
            // {
            //     Console.WriteLine(e);
            //     return StatusCode(StatusCodes.Status500InternalServerError);
            // }

            return Ok();
        }
    }
}