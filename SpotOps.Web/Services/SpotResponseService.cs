using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Http;
using SpotOps.Models;
using SpotOps.ResponseModels;

namespace SpotOps.Services
{
    public class SpotResponseService : ISpotResponseService
    {
        /// <summary>
        /// 
        /// </summary>
        private IHttpContextAccessor _httpContextAccessor;

        /// <summary>
        /// Spot service handling all spot data.
        /// </summary>
        private ISpotService _spotService;

        /// <summary>
        /// Spot Image handling service.
        /// </summary>
        private ISpotImageService _spotImageService;

        /// <summary>
        /// 
        /// </summary>
        private IUserService _userService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="httpContextAccessor"></param>
        /// <param name="spotService"></param>
        /// <param name="spotImageService"></param>
        /// <param name="userService"></param>
        public SpotResponseService(
            IHttpContextAccessor httpContextAccessor,
            ISpotService spotService,
            ISpotImageService spotImageService,
            IUserService userService)
        {
            _httpContextAccessor = httpContextAccessor;
            _spotService = spotService;
            _spotImageService = spotImageService;
            _userService = userService;
        }

        /// <summary>
        /// Returns a collection of all SpotResponses in the current ApplicationDbContext
        /// </summary>
        /// <returns></returns>
        public async Task<ICollection<SpotResponse>> GetAll()
        {
            ICollection<SpotResponse> spotResponses = new List<SpotResponse>();

            var spots = await _spotService.GetAll();
            var spotImages = await _spotImageService.GetAll();
    
            // Take the faster one, time them with a stopwatch!
            var joinedSpots = from l1 in spots 
                join l2 in spotImages 
                    on l1.Id equals l2.Spot.Id
                select new
                {
                    l1.Id,
                    l1.Name,
                    l1.Type,
                    l1.DateCreated,
                    l2.OriginalFileName,
                    l2.GuidFileName
                };
            
            // or is this one faster....
            var spotsToReturn = spots.Join(spotImages, 
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
            
            // create a spot response for each record
            foreach (var joinedSpot in joinedSpots)
            {
                spotResponses.Add(new SpotResponse
                {
                    Id = joinedSpot.Id,
                    Name = joinedSpot.Name,
                    Type = joinedSpot.Type,
                    DateCreated = joinedSpot.DateCreated,
                    FileName = joinedSpot.OriginalFileName,
                    FileImageSrc = GetImageSrc(joinedSpot.GuidFileName)
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
            var spot = await _spotService.GetById(id);
            if (spot == null)
            {
                return null;
            }

            var image = await _spotImageService.GetBySpotId(spot.Id);
            
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
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userService.GetById(userId);

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

            await _spotService.AddAsync(newSpot);
            await _spotImageService.AddAsync(spotImage);
                
            spotResponse.Id = newSpot.Id;
                
            return spotResponse;
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
                var spotToDelete = await _spotService.GetById(id);
                    //.Spots.FirstOrDefaultAsync(spot => spot.Id == id);
               
                if (spotToDelete == null)
                {
                    return false;
                }
                
                var imageToDelete = _spotImageService.Remove(spotToDelete.Id);
                    //.SpotImages.FirstOrDefaultAsync(image => image.Spot.Id.Equals(spotToDelete.Id));
                await _spotService.Remove(spotToDelete.Id);
                //_context.Spots.Remove(spotToDelete);
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
        /// <param name="fileName"></param>
        /// <returns></returns>
        public string GetImageSrc(string fileName)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                return fileName.IsNullOrEmpty()
                    ? string.Empty
                    : string.Format("{0}://{1}{2}/images/{3}",
                        _httpContextAccessor.HttpContext.Request.Scheme,
                        _httpContextAccessor.HttpContext.Request.Host,
                        _httpContextAccessor.HttpContext.Request.PathBase,
                        fileName);
            }
            
            return string.Empty;
        }
    }
}