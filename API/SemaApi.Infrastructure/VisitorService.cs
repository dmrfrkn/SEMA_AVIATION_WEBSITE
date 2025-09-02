using SemaApi.Domain;
using SemaApi.Application;

namespace SemaApi.Infrastructure
{
    public class VisitorService : IVisitorService
    {
        private readonly AppDbContext _context;
        public VisitorService(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddVisitorAsync(Visitor visitor)
        {
            _context.Visitors.Add(visitor);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> VisitorExistsAsync(string email, string phone)
        {
            return await Task.FromResult(_context.Visitors.Any(v => v.Email == email || v.Phone == phone));
        }
    }
}
