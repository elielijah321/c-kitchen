using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Text.Json;
using AremuCoreServices;
using AremuCoreServices.Helpers;
using AremuCoreServices.Models;
using AremuCoreServices.Models.CredentialRecords;
using AremuCoreServices.Models.Enums;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Project.Function.Helpers;
using Project.Function.Models;

namespace Project.Function.Endpoints
{
    public class PaymentEndpoint
    {
        private readonly ILogger<PaymentEndpoint> _logger;

        public PaymentEndpoint(ILogger<PaymentEndpoint> logger)
        {
            _logger = logger;
        }

        [Function("CreatePayment")]
        public async Task<HttpResponseData> CreatePayment(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", "options", Route = "payment/create")] HttpRequestData req)
        {
            _logger.LogInformation("Payment creation endpoint called.");

            // Handle preflight OPTIONS request
            if (req.Method.Equals("OPTIONS", StringComparison.OrdinalIgnoreCase))
            {
                var optionsResponse = req.CreateResponse(HttpStatusCode.OK);
                ResponseHelper.AddCorsHeaders(optionsResponse);
                return optionsResponse;
            }

            try
            {
                // Parse the request body
                var requestBody = await req.ReadAsStringAsync();
                if (string.IsNullOrEmpty(requestBody))
                {
                    return await ResponseHelper.BadRequestObjectResult(req, new
                    {
                        error = "Request body is required",
                        details = "Payment request data must be provided in the request body",
                        timestamp = DateTime.UtcNow.ToString("O")
                    });
                }

                var paymentRequest = JsonSerializer.Deserialize<PaymentRequest>(requestBody, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (paymentRequest == null)
                {
                    return await ResponseHelper.BadRequestObjectResult(req, new
                    {
                        error = "Invalid request format",
                        details = "Unable to parse payment request data",
                        timestamp = DateTime.UtcNow.ToString("O")
                    });
                }

                // Validate required fields
                if (string.IsNullOrEmpty(paymentRequest.ProductName) || paymentRequest.AmountInPence <= 0)
                {
                    return await ResponseHelper.BadRequestObjectResult(req, new
                    {
                        error = "Invalid payment data",
                        details = "Product name and amount are required",
                        timestamp = DateTime.UtcNow.ToString("O")
                    });
                }

                // Create Stripe credentials
                var stripeCredentialsRecord = new StripeCredentialsRecord(
                    SystemConstants.StripeApiKey,
                    StripePaymentMode.PAYMENT,
                    StripePaymentCurrency.GBP,
                    paymentRequest.SuccessUrl ?? "https://example.com/success",
                    paymentRequest.CancelUrl ?? "https://example.com/cancel"
                );

                // Create line item
                var lineItem = new StripeLineItemRecord(
                    paymentRequest.ProductName,
                    paymentRequest.AmountInPence,
                    paymentRequest.Quantity
                );

                _logger.LogInformation("Creating Stripe checkout session for: {ProductName}, Amount: {Amount}, Quantity: {Quantity}", 
                    paymentRequest.ProductName, paymentRequest.AmountInPence, paymentRequest.Quantity);

                // Create checkout session
                var checkoutUrl = await StripeService.CreateCheckoutSession(
                    stripeCredentialsRecord,
                    new List<StripeLineItemRecord> { lineItem },
                    StripePaymentType.CARD,
                    paymentRequest.Metadata ?? new Dictionary<string, string>()
                );

                if (string.IsNullOrEmpty(checkoutUrl))
                {
                    return await ResponseHelper.InternalServerErrorObjectResult(req, new
                    {
                        error = "Payment session creation failed",
                        details = "Unable to create Stripe checkout session",
                        timestamp = DateTime.UtcNow.ToString("O")
                    });
                }

                var response = new PaymentResponse
                {
                    Success = true,
                    CheckoutUrl = checkoutUrl,
                    SessionId = null, // Stripe session ID would be extracted from the service if needed
                    Timestamp = DateTime.UtcNow.ToString("O")
                };

                _logger.LogInformation("Successfully created payment session: {CheckoutUrl}", checkoutUrl);

                // Serialize with camelCase to match frontend expectations
                var jsonOptions = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };
                
                var camelCaseResponse = new
                {
                    success = response.Success,
                    checkoutUrl = response.CheckoutUrl,
                    sessionId = response.SessionId,
                    errorMessage = response.ErrorMessage,
                    timestamp = response.Timestamp
                };

                return await ResponseHelper.OkObjectResult(req, camelCaseResponse);
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Failed to parse payment request JSON");
                return await ResponseHelper.BadRequestObjectResult(req, new
                {
                    error = "Invalid JSON format",
                    details = ex.Message,
                    timestamp = DateTime.UtcNow.ToString("O")
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error creating payment session");
                return await ResponseHelper.InternalServerErrorObjectResult(req, new
                {
                    error = "Internal server error",
                    details = "An unexpected error occurred while processing your payment request",
                    timestamp = DateTime.UtcNow.ToString("O")
                });
            }
        }
    }
}
