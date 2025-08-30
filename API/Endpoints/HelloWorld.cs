using System;
using System.Net;
using System.Threading.Tasks;
using AremuCoreServices;
using AremuCoreServices.Helpers;
using AremuCoreServices.Models;
using AremuCoreServices.Models.CredentialRecords;
using AremuCoreServices.Models.Enums;
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
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "options", Route = "helloWorld")] HttpRequestData req)
        {
            _logger.LogInformation("Hello World function processed a request (isolated).");

            // Handle preflight OPTIONS request
            if (req.Method.Equals("OPTIONS", StringComparison.OrdinalIgnoreCase))
            {
                var optionsResponse = req.CreateResponse(HttpStatusCode.OK);
                ResponseHelper.AddCorsHeaders(optionsResponse);
                return optionsResponse;
            }



            var stripeCredentialsRecord = new StripeCredentialsRecord(
                        SystemConstants.StripeApiKey,           // ApiKey
                        StripePaymentMode.PAYMENT,           // Mode
                        StripePaymentCurrency.GBP,           // Currency
                        "https://example.com/success",       // SuccessUrl
                        "https://example.com/cancel"         // CancelUrl
                    );

            var lineItem = new StripeLineItemRecord("Test Product",500,1);

            // Create test credentials
            var credentials = new GoogleCredentialsRecord(
                CredentialsJson: SystemConstants.GoogleCredentialsJson,
                User: SystemConstants.GoogleCredentialsUser,
                Scopes: new string[] { "https://www.googleapis.com/auth/spreadsheets" },
                ApplicationName: "AremuCoreServices Test"
            );

            var paymentLink = await StripeService.CreateCheckoutSession(stripeCredentialsRecord, new List<StripeLineItemRecord> { lineItem }, StripePaymentType.CARD, new Dictionary<string, string>());

            _logger.LogInformation("Payment Link: {PaymentLink}", paymentLink);

            // Create test sheet info
            var sheetInfo = new GoogleSheetInfoRecord(
                SpreadsheetId: SystemConstants.GoogleSheetInfoRecordSpreadsheetId,
                CellRange: SystemConstants.GoogleSheetInfoRecordCellRange
            );

            var testData = new List<string>();

            try
            {
                var data = GoogleSheetService.GetData(credentials, sheetInfo);

                if (data != null && data.Count > 0)
                {
                    for (int i = 0; i < Math.Min(3, data.Count); i++)
                    {
                        var row = data[i];
                        var rowData = string.Join(" | ", row.Select(cell => cell?.ToString() ?? ""));
                        Console.WriteLine($"   Row {i + 1}: {rowData}");

                        testData.Add(rowData);
                    }
                }
            
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Failed to test Google Sheets service: {ex.Message}");
            }

            // Create an object to return
            var result = new
            {
                Message = "Hello World, this is a test function (isolated, .NET 8)!",
                Timestamp = DateTime.UtcNow,
                Status = "Success",
                Values = testData
            };

            return await ResponseHelper.OkObjectResult(req, result);
        }
    }
}
