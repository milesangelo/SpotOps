using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotOps.Web.Models
{
    /// <summary>
    /// The Spot model object.
    /// </summary>
    public class Spot
    {
        /// <summary>
        /// Spot unique id.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The spot name.
        /// </summary>
        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        /// <summary>
        /// The DateTime the spot was created.
        /// </summary>
        public DateTime DateCreated { get; set; }

        /// <summary>
        /// The user id the spot was created by.
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// The type of spot.
        /// </summary>
        public string Type { get; set; }
    }
}