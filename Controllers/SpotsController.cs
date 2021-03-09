using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpotOps.Data;
using SpotOps.Models;
using SpotOps.ResponseModels;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using IdentityServer4.Extensions;

namespace SpotOps.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/spots")]
    public class SpotsController : ControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        private ApplicationDbContext _db;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbContext"></param>
        public SpotsController(ApplicationDbContext dbContext)
        {
            _db = dbContext;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("get/{id:int}")]
        public IActionResult GetById(int id)
        {
            var spot = _db.Spots
                .FirstOrDefault(spt => spt.Id == id);

            if (spot == null)
            {
                return NotFound();
            }

            return Ok(spot);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("get")]
        public IActionResult Get()
        {
            var spots = _db.Spots.Select(spot => spot);
            return Ok(spots);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="spot"></param>
        /// <returns></returns>
        [HttpPost("post")]
        public async Task<ActionResult> Post([FromForm] SpotResponse spot)
        {
            //679226d5-27d8-4ee6-8d5d-45b73efaceb7
            //211cb98b-638b-4cd0-94d0-192c8cc02617

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = _db.Users.First(user => user.Id.Equals(userId));
            
            // Create a new spot & save changes to get spot id fore spot image.
            var newSpot = new Spot
            {
                Name = spot.Name,
                DateCreated = DateTime.Now,
                CreatedBy = user.Id
            };
            
            await _db.Spots.AddAsync(newSpot);
            
            SpotImage spotImage = new SpotImage();
            try
            {
                var fileExtension = Path.GetExtension(spot.FileName);

                spotImage.Spot = newSpot;
                spotImage.PathToFile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                spotImage.Guid = Guid.NewGuid().ToString();
                spotImage.FileName = spot.FileName;
                spotImage.ImageType = fileExtension;
                spotImage.CreatedBy = user.Id;
                
                var path = Path.Combine(spotImage.PathToFile, spotImage.Guid + spotImage.ImageType);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    spot.FormFile.CopyTo(stream);
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
            
            await _db.SpotImages.AddAsync(spotImage);
            
            await _db.SaveChangesAsync();
            
            
            return Ok(newSpot);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("delete/{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var spotToDelete = _db.Spots.First(spot => spot.Id == id);

                if (spotToDelete == null)
                {
                    return NotFound($"Spot with id = {id} was not found.");
                }

                _db.Spots.Remove(spotToDelete);
                _db.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="spot"></param>
        /// <returns></returns>
        [HttpPut("update/{id:int}")]
        public IActionResult Put(int id, [FromBody] Spot spot)
        {
            try
            {
                var spotToEdit = _db.Spots.First(spot => spot.Id == id);
                
                if (spotToEdit == null)
                {
                    return NotFound($"Spot with id = {id} was not found.");
                }

                spotToEdit.Name = spot.Name;
                //spotToEdit.DateModified = DateTime.Now;
                
                _db.SaveChanges();
                
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}