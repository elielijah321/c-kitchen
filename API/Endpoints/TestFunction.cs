using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Project.Function.Helpers;

namespace Project.Function
{
    public class TestFunction
    {
        private readonly ILogger<TestFunction> _logger;

        public TestFunction(ILogger<TestFunction> logger)
        {
            _logger = logger;
        }

        [Function("healthCheck")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "health")] HttpRequestData req)
        {
            _logger.LogInformation("Health check function processed a request (isolated).");

            // Create an object to return
            var result = new
            {
                Message = "API is healthy and running (isolated, .NET 8)!",
                Service = "c-kitchen-api",
                Timestamp = DateTime.UtcNow,
                Status = "Healthy",
                Version = "1.0.0"
            };

            return await ResponseHelper.OkObjectResult(req, result);
        }
    }
}
