using SemaApi.Domain;

namespace SemaApi.Application
{
    public interface IVisitorService
    {
        Task AddVisitorAsync(Visitor visitor);
        Task<bool> VisitorExistsAsync(string email, string phone);
        // İleride diğer işlemler için metotlar eklenebilir
    }
}
