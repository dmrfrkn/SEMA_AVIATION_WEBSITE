using SemaApi.Domain;

namespace SemaApi.Application
{
    public interface IVisitorService
    {
        Task AddVisitorAsync(Visitor visitor);
        // İleride diğer işlemler için metotlar eklenebilir
    }
}
