using System.Collections;
using System.Collections.Generic;
using Microsoft.Extensions.Hosting.Internal;

namespace SpotOps.Models
{
    public class Group
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public ICollection<ApplicationUser> Users { get; set; }
        
    }
}