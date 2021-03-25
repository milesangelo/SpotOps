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
            //
            // ICollection<SpotResponse> spotResponses = new List<SpotResponse>();
            //
            // var spotsWithImage = _db.Spots.Join(_db.SpotImages,
            //     spt => spt.Id,
            //     img => img.Spot.Id,
            //     (spot, image) => new
            //     {
            //         spot.Id,
            //         spot.Name,
            //         spot.Type,
            //         spot.DateCreated,
            //         image.OriginalFileName,
            //         image.GuidFileName
            //     });
            //
            // foreach (var spotwImage in spotsWithImage)
            // {
            //     spotResponses.Add(new SpotResponse
            //     {
            //         Id = spotwImage.Id,
            //         Name = spotwImage.Name,
            //         Type = spotwImage.Type,
            //         DateCreated = spotwImage.DateCreated,
            //         FileName = spotwImage.OriginalFileName,
            //         FileImageSrc = GetImageSrc(spotwImage.GuidFileName)
            //     });
            // }
            //
            // return Ok(spotResponses);
        }
        
        

        /// <summary>
        /// 
        /// </summary>
        /// <param name="spot"></param>
        /// <returns></returns>
        [HttpPost("post")]
        public async Task<ActionResult> Post([FromForm] SpotResponse spot)
        {
            // var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            // var user = _db.Users.First(user => user.Id.Equals(userId));
            //
            // // Create a new spot & save changes to get spot id fore spot image.
            // var newSpot = new Spot
            // {
            //     Name = spot.Name,
            //     Type = spot.Type,
            //     DateCreated = DateTime.Now,
            //     CreatedBy = user.Id
            // };
            //
            // await _db.Spots.AddAsync(newSpot);
            //
            // SpotImage spotImage = new SpotImage();
            // try
            // {
            //     var fileExtension = Path.GetExtension(spot.FileName);
            //
            //     spotImage.Spot = newSpot;
            //     spotImage.PathToFile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            //     spotImage.Guid = Guid.NewGuid().ToString();
            //     spotImage.FileName = spot.FileName;
            //     spotImage.ImageType = fileExtension;
            //     spotImage.CreatedBy = user.Id;
            //     
            //     var path = Path.Combine(spotImage.PathToFile, spotImage.Guid + spotImage.ImageType);
            //     using (Stream stream = new FileStream(path, FileMode.Create))
            //     {
            //         spot.FormFile.CopyTo(stream);
            //     }
            // }
            // catch (Exception ex)
            // {
            //     return BadRequest();
            // }
            //
            // await _db.SpotImages.AddAsync(spotImage);
            //
            // await _db.SaveChangesAsync();
            //
            //
             return Ok();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("delete/{id:int}")]
        public IActionResult Delete(int id)
        {
            // try
            // {
            //     var spotToDelete = _db.Spots.First(spot => spot.Id == id);
            //
            //     if (spotToDelete == null)
            //     {
            //         return NotFound($"Spot with id = {id} was not found.");
            //     }
            //
            //     _db.Spots.Remove(spotToDelete);
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