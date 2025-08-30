using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker.Http;

namespace Project.Function.Helpers
{
    public static class ResponseHelper
    {
        /// <summary>
        /// Creates an OK (200) HTTP response with JSON content from the provided object
        /// </summary>
        /// <param name="req">The HTTP request data</param>
        /// <param name="data">The object to serialize as JSON response</param>
        /// <returns>HttpResponseData with OK status and JSON content</returns>
        public static async Task<HttpResponseData> OkObjectResult(HttpRequestData req, object data)
        {
            var response = req.CreateResponse(HttpStatusCode.OK);
            AddCorsHeaders(response);
            response.Headers.Add("Content-Type", "application/json; charset=utf-8");
            await response.WriteStringAsync(JsonSerializer.Serialize(data));
            return response;
        }

        /// <summary>
        /// Creates a BadRequest (400) HTTP response with JSON content from the provided object
        /// </summary>
        /// <param name="req">The HTTP request data</param>
        /// <param name="data">The object to serialize as JSON response</param>
        /// <returns>HttpResponseData with BadRequest status and JSON content</returns>
        public static async Task<HttpResponseData> BadRequestObjectResult(HttpRequestData req, object data)
        {
            var response = req.CreateResponse(HttpStatusCode.BadRequest);
            AddCorsHeaders(response);
            response.Headers.Add("Content-Type", "application/json; charset=utf-8");
            await response.WriteStringAsync(JsonSerializer.Serialize(data));
            return response;
        }

        /// <summary>
        /// Creates a NotFound (404) HTTP response with JSON content from the provided object
        /// </summary>
        /// <param name="req">The HTTP request data</param>
        /// <param name="data">The object to serialize as JSON response</param>
        /// <returns>HttpResponseData with NotFound status and JSON content</returns>
        public static async Task<HttpResponseData> NotFoundObjectResult(HttpRequestData req, object data)
        {
            var response = req.CreateResponse(HttpStatusCode.NotFound);
            AddCorsHeaders(response);
            response.Headers.Add("Content-Type", "application/json; charset=utf-8");
            await response.WriteStringAsync(JsonSerializer.Serialize(data));
            return response;
        }

        /// <summary>
        /// Creates an InternalServerError (500) HTTP response with JSON content from the provided object
        /// </summary>
        /// <param name="req">The HTTP request data</param>
        /// <param name="data">The object to serialize as JSON response</param>
        /// <returns>HttpResponseData with InternalServerError status and JSON content</returns>
        public static async Task<HttpResponseData> InternalServerErrorObjectResult(HttpRequestData req, object data)
        {
            var response = req.CreateResponse(HttpStatusCode.InternalServerError);
            AddCorsHeaders(response);
            response.Headers.Add("Content-Type", "application/json; charset=utf-8");
            await response.WriteStringAsync(JsonSerializer.Serialize(data));
            return response;
        }

        /// <summary>
        /// Creates a custom HTTP response with JSON content from the provided object
        /// </summary>
        /// <param name="req">The HTTP request data</param>
        /// <param name="statusCode">The HTTP status code</param>
        /// <param name="data">The object to serialize as JSON response</param>
        /// <returns>HttpResponseData with specified status and JSON content</returns>
        public static async Task<HttpResponseData> ObjectResult(HttpRequestData req, HttpStatusCode statusCode, object data)
        {
            var response = req.CreateResponse(statusCode);
            AddCorsHeaders(response);
            response.Headers.Add("Content-Type", "application/json; charset=utf-8");
            await response.WriteStringAsync(JsonSerializer.Serialize(data));
            return response;
        }

        /// <summary>
        /// Adds CORS headers to the HTTP response
        /// </summary>
        /// <param name="response">The HTTP response to add headers to</param>
        public static void AddCorsHeaders(HttpResponseData response)
        {
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
            response.Headers.Add("Access-Control-Max-Age", "86400");
        }
    }
}
