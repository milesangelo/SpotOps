namespace SpotOps.Models
{
    public class SpotLocation
    {
        public int Id { get; set; }
        
        public decimal Longitude { get; set; }
        
        public decimal Latitude { get; set; }
        
        public Spot Spot { get; set; }
        
    }
}