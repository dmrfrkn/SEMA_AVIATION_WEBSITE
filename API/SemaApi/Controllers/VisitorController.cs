using Microsoft.AspNetCore.Mvc;
using SemaApi.Domain;
using SemaApi.Application;

namespace SemaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitorController : ControllerBase
    {
        private readonly IVisitorService _visitorService;
        public VisitorController(IVisitorService visitorService)
        {
            _visitorService = visitorService;
        }

        [HttpPost]
        public async Task<IActionResult> AddVisitor([FromBody] Visitor visitor)
        {
            await _visitorService.AddVisitorAsync(visitor);
            return Ok();
        }
    }
}
