using System.Threading.Tasks;
using AremuCoreServices;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Project.Function.Helpers;

namespace Project.Function
{
    public class HelloWorldFunction
    {
        private readonly ILogger<HelloWorldFunction> _logger;

        public HelloWorldFunction(ILogger<HelloWorldFunction> logger)
        {
            _logger = logger;
        }

        [Function("helloWorld")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "helloWorld")] HttpRequestData req)
        {
            _logger.LogInformation("Hello World function processed a request (isolated).");


            try
            {
                await TelegramService.SendMessage("Hello World function processed a request (isolated).");
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error occurred while processing request.");
                throw;
            }


            // Create an object to return
            var result = new
            {
                Message = "Hello World, this is a test function (isolated, .NET 8)!",
                Timestamp = DateTime.UtcNow,
                Status = "Success"
            };

            return await ResponseHelper.OkObjectResult(req, result);
        }
    }
}
