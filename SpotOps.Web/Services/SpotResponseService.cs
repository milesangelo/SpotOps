using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using SpotOps.Data;
using SpotOps.Models;
using SpotOps.ResponseModels;
using SQLitePCL;

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
        /// 
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
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<SpotResponse> GetById(int id)
        {
            var spot = await _context.Spots
                    .FirstOrDefaultAsync(spt => spt.Id == id);
            
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
        /// <returns></returns>
        public async Task<ICollection<SpotResponse>> GetAsync()
        {
            return await _context.Spots
                .Select(spt => new SpotResponse
                    {
                        Name = spt.Name
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