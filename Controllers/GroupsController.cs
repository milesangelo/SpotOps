using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotOps.Data;
using SpotOps.Models;

namespace SpotOps.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/[controller]")]
    public class GroupsController : ControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        private ApplicationDbContext _db;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="db"></param>
        public GroupsController(ApplicationDbContext db)
        {
            _db = db;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Group> Get()
        {
            var currentUserId = User
                .FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
            
            return _db.Groups.Where(grp => grp.Users
                    .Any(user => user.Id == currentUserId))
                .ToList();
        }
    }
}