using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SpotOps.Data;
using SpotOps.Models;
using SpotOps.ResponseModels;

namespace SpotOps.Services
{
    public class SpotResponseService : ISpotResponseService
    {
        /// <summary>
        /// 
        /// </summary>
        private ApplicationDbContext _context;
        
        /// <summary>
        /// 
        /// </summary>
        private IHttpContextAccessor _httpContextAccessor;
         
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="httpContextAccessor"></param>
        public SpotResponseService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Returns a collection of all SpotResponses in the current ApplicationDbContext
        /// </summary>
        /// <returns></returns>
        public ICollection<SpotResponse> GetAll()
        {
            ICollection<SpotResponse> spotResponses = new List<SpotResponse>();
            
            var spots = _context.Spots.Join(_context.SpotImages,
                spt => spt.Id,
                img => img.Spot.Id,
                (spot, image) => new
                {
                    spot.Id,
                    spot.Name,
                    spot.Type,
                    spot.DateCreated,
                    image.OriginalFileName,
                    image.GuidFileName
                });
            
            foreach (var spotwImage in spots)
            {
                spotResponses.Add(new SpotResponse
                {
                    Id = spotwImage.Id,
                    Name = spotwImage.Name,
                    Type = spotwImage.Type,
                    DateCreated = spotwImage.DateCreated,
                    FileName = spotwImage.OriginalFileName,
                    FileImageSrc = GetImageSrc(spotwImage.GuidFileName)
                });
            }
            
            return spotResponses;
        }

        /// <summary>
        /// Returns a SpotResponse whose Spot.Id matches id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<SpotResponse> GetById(int id)
        {
            var spot = await _context.Spots
                    .FirstOrDefaultAsync(spt => spt.Id == id);
            
            if (spot == null)
            {
                return null;
            }
            
            var image = await _context.SpotImages
                .FirstOrDefaultAsync(img => img.Spot.Equals(spot));
            
            var spotResponse = new SpotResponse
            {
                Id = spot.Id,
                Name = spot.Name,
                Type = spot.Type,
                FileName = image.FileName,
                FileImageSrc = GetImageSrc(image.GuidFileName)
            };
        
            return spotResponse;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="spotResponse"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<SpotResponse> Add(SpotResponse spotResponse)
        {
            try
            {
                var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = _context.Users.First(usr => usr.Id.Equals(userId));

                var fileExtension = Path.GetExtension(spotResponse.FileName);

                // Create a new spot & save changes to get spot id fore spot image.
                var newSpot = new Spot
                {
                    Name = spotResponse.Name,
                    Type = spotResponse.Type,
                    DateCreated = DateTime.Now,
                    CreatedBy = user.Id
                };

                SpotImage spotImage = new SpotImage
                {
                    Spot = newSpot,
                    PathToFile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"),
                    Guid = Guid.NewGuid().ToString(),
                    FileName = spotResponse.FileName,
                    ImageType = fileExtension,
                    CreatedBy = user.Id
                };
                
                var path = Path.Combine(spotImage.PathToFile, spotImage.Guid + spotImage.ImageType);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    spotResponse.FormFile.CopyTo(stream);
                }

                await _context.Spots.AddAsync(newSpot);
                await _context.SpotImages.AddAsync(spotImage);
                await _context.SaveChangesAsync();

                spotResponse.Id = newSpot.Id;
                
                return spotResponse;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<bool> Remove(int id)
        {
            try
            {
                // Get the spot with matching id.
                var spotToDelete = await _context.Spots
                    .FirstOrDefaultAsync(spot => spot.Id == id);
               
                if (spotToDelete == null)
                {
                    return false;
                }
                
                // Get the spot image record with
                var imageToDelete = _context.SpotImages
                    .FirstOrDefaultAsync(image => image.Spot.Id.Equals(spotToDelete.Id));
                
                _context.Spots.Remove(spotToDelete);
                _context.SaveChanges();
                
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<ICollection<SpotResponse>> GetAsync()
        {
            return await _context.Spots
                .Select(spt => new SpotResponse
                    {
                        Name = spt.Name,
                        Id = spt.Id,
                        DateCreated = spt.DateCreated,
                        Type = spt.Type,
                    }).ToListAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public string GetImageSrc(string fileName)
        {
            return fileName.IsNullOrEmpty()
                ? string.Empty
                : string.Format("{0}://{1}{2}/images/{3}",
                    _httpContextAccessor.HttpContext.Request.Scheme,
                    _httpContextAccessor.HttpContext.Request.Host,
                    _httpContextAccessor.HttpContext.Request.PathBase,
                    fileName);
        }
    }
}