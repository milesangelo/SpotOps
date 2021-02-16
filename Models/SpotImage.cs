namespace SpotOps.Models
{
    public class SpotImage
    {
        public int Id { get; set; }
        
        public decimal Lng { get; set; }
        
        public decimal Lat { get; set; }
        
        public string FileName { get; set; }
        
        public Spot Spot { get; set; }
    }
}