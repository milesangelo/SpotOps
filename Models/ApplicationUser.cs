using Microsoft.AspNetCore.Identity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpotOps.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Group> Groups { get; set; }
    }
}
