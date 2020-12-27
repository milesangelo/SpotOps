namespace SpotOps.Models
{
    public class GroupMembership
    {
        public int Id { get; set; }

        public Group Group { get; set; }
        
        public User User { get; set; }
    }
}