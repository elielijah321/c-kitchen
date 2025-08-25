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

        [Function("test")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "test")] HttpRequestData req)
        {
            _logger.LogInformation("Test function processed a request (isolated).");

            // Create an object to return
            var result = new
            {
                Message = "Hello EA, this is a test function (isolated, .NET 8)!",
                Timestamp = DateTime.UtcNow,
                Status = "Success"
            };

            return await ResponseHelper.OkObjectResult(req, result);
        }
    }
}
