namespace SpotOps.Data.Spots
{
    public class GeoLocation
    {
        public decimal Latitude { get; set; }
    
        public decimal Longitude { get; set; }

        public bool IsValidCoordinates => this.Latitude != 0 && this.Longitude != 0;

        public GeoLocation(decimal lat, decimal lng)
        {
            Latitude = lat;
            Longitude = lng;
        }
    }
    
}