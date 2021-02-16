namespace SpotOps.Net.Data
{
    public class GeoLocation
    {
        public decimal Latitude { get; set; }
        
        public decimal Longitude { get; set; }

        public GeoLocation(decimal lat, decimal lng)
        {
            Latitude = lat;
            Longitude = lng;
        }
    }
}