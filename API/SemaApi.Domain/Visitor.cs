namespace SemaApi.Domain
{
    public class Visitor
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool KvkkConsent { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
