using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Text.Json;
using AremuCoreServices;
using AremuCoreServices.Helpers;
using AremuCoreServices.Models;
using AremuCoreServices.Models.CredentialRecords;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Project.Function.Helpers;
using Project.Function.Models;

namespace Project.Function.Endpoints
{
    public class ReservationEndpoint
    {
        private readonly ILogger<ReservationEndpoint> _logger;

        public ReservationEndpoint(ILogger<ReservationEndpoint> logger)
        {
            _logger = logger;
        }

        [Function("ReservationSuccess")]
        public async Task<HttpResponseData> ReservationSuccess(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", "options", Route = "reservation/success")] HttpRequestData req)
        {
            _logger.LogInformation("Reservation success endpoint called.");

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
                        details = "Reservation data must be provided in the request body",
                        timestamp = DateTime.UtcNow.ToString("O")
                    });
                }

                var reservationData = JsonSerializer.Deserialize<ReservationSuccessRequest>(requestBody, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (reservationData == null)
                {
                    return await ResponseHelper.BadRequestObjectResult(req, new
                    {
                        error = "Invalid request format",
                        details = "Unable to parse reservation data",
                        timestamp = DateTime.UtcNow.ToString("O")
                    });
                }

                ReservationDetails finalReservationDetails;

                // If Stripe session ID is provided, retrieve metadata from Stripe
                if (!string.IsNullOrEmpty(reservationData.StripeSessionId))
                {
                    _logger.LogInformation("Retrieving reservation details from Stripe session: {SessionId}", reservationData.StripeSessionId);

                    try
                    {
                        // For Stripe reservations, the metadata should be passed from the frontend
                        // The frontend sends the reservation details when creating the payment session
                        // We'll use the provided data and mark it as paid
                        finalReservationDetails = CreateReservationDetailsFromRequest(reservationData);
                        finalReservationDetails.PaymentStatus = "Paid";
                        finalReservationDetails.StripeSessionId = reservationData.StripeSessionId;
                        
                        _logger.LogInformation("Using provided reservation data for Stripe session: {SessionId}", reservationData.StripeSessionId);
                        
                        // Note: To get full Stripe session details, you would need to implement a webhook endpoint
                        // that receives the session data from Stripe, or use Stripe's API directly
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Failed to retrieve Stripe session data, using provided data as fallback");
                        finalReservationDetails = CreateReservationDetailsFromRequest(reservationData);
                    }
                }
                else
                {
                    // No Stripe session - direct reservation (no deposit)
                    _logger.LogInformation("Processing direct reservation (no deposit required)");
                    finalReservationDetails = CreateReservationDetailsFromRequest(reservationData);
                    finalReservationDetails.PaymentStatus = "No Deposit Required";
                }

                // Validate required fields
                if (string.IsNullOrEmpty(finalReservationDetails.FirstName) ||
                    string.IsNullOrEmpty(finalReservationDetails.LastName) ||
                    string.IsNullOrEmpty(finalReservationDetails.ReservationDate) ||
                    string.IsNullOrEmpty(finalReservationDetails.ReservationTime))
                {
                    return await ResponseHelper.BadRequestObjectResult(req, new
                    {
                        error = "Missing required reservation data",
                        details = "First name, last name, date, and time are required",
                        timestamp = DateTime.UtcNow.ToString("O")
                    });
                }

                // Check for duplicate Stripe session ID before adding
                bool isDuplicate = false;
                if (!string.IsNullOrEmpty(finalReservationDetails.StripeSessionId))
                {
                    isDuplicate = await CheckIfRowExists(finalReservationDetails.StripeSessionId);
                }

                // Only append to Google Spreadsheet if not a duplicate
                if (!isDuplicate)
                {
                    var success = await AppendReservationToSpreadsheet(finalReservationDetails);

                    if (!success)
                    {
                        return await ResponseHelper.InternalServerErrorObjectResult(req, new
                        {
                            error = "Failed to save reservation",
                            details = "Unable to append reservation to spreadsheet",
                            timestamp = DateTime.UtcNow.ToString("O")
                        });
                    }

                    _logger.LogInformation("Successfully saved reservation for {FirstName} {LastName} on {Date} at {Time}",
                        finalReservationDetails.FirstName, finalReservationDetails.LastName,
                        finalReservationDetails.ReservationDate, finalReservationDetails.ReservationTime);
                }
                else
                {
                    _logger.LogWarning("Duplicate reservation detected for Stripe session: {SessionId}, showing details without saving", finalReservationDetails.StripeSessionId);
                }

                var reservationId = isDuplicate ? "DUPLICATE" : Guid.NewGuid().ToString();
                var message = isDuplicate ? "Reservation details retrieved (duplicate payment session)" : "Reservation saved successfully";

                var response = new
                {
                    success = true,
                    message = message,
                    reservationId = reservationId,
                    isDuplicate = isDuplicate,
                    reservationDetails = new
                    {
                        firstName = finalReservationDetails.FirstName,
                        lastName = finalReservationDetails.LastName,
                        reservationType = finalReservationDetails.ReservationType,
                        reservationTypeLabel = finalReservationDetails.ReservationTypeLabel,
                        reservationDate = finalReservationDetails.ReservationDate,
                        reservationTime = finalReservationDetails.ReservationTime,
                        partySize = finalReservationDetails.PartySize,
                        notes = finalReservationDetails.Notes,
                        depositAmount = finalReservationDetails.DepositAmount,
                        paymentStatus = finalReservationDetails.PaymentStatus,
                        stripeSessionId = finalReservationDetails.StripeSessionId
                    },
                    timestamp = DateTime.UtcNow.ToString("O")
                };

                return await ResponseHelper.OkObjectResult(req, response);
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Failed to parse reservation request JSON");
                return await ResponseHelper.BadRequestObjectResult(req, new
                {
                    error = "Invalid JSON format",
                    details = ex.Message,
                    timestamp = DateTime.UtcNow.ToString("O")
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error processing reservation success");
                return await ResponseHelper.InternalServerErrorObjectResult(req, new
                {
                    error = "Internal server error",
                    details = "An unexpected error occurred while processing the reservation",
                    timestamp = DateTime.UtcNow.ToString("O")
                });
            }
        }

        private ReservationDetails CreateReservationDetailsFromRequest(ReservationSuccessRequest request)
        {
            return new ReservationDetails
            {
                FirstName = request.FirstName ?? "Unknown",
                LastName = request.LastName ?? "Guest",
                ReservationType = request.ReservationType ?? "regular",
                ReservationTypeLabel = GetReservationTypeLabel(request.ReservationType ?? "regular"),
                ReservationDate = request.ReservationDate ?? DateTime.UtcNow.ToString("dd/MM/yyyy"),
                ReservationTime = request.ReservationTime ?? "Not specified",
                PartySize = request.PartySize ?? 2,
                Notes = request.Notes ?? "",
                DepositAmount = request.DepositAmount ?? 0,
                PaymentStatus = request.DepositAmount > 0 ? "Paid" : "No Deposit Required",
                StripeSessionId = request.StripeSessionId,
                CreatedAt = DateTime.UtcNow
            };
        }

        private string GetReservationTypeLabel(string reservationType)
        {
            return reservationType.ToLower() switch
            {
                "regular" => "Regular Dining",
                "ayce" => "All You Can Eat (AYCE)",
                "christmas" => "Christmas Menu (inc Christmas Day)",
                _ => "Regular Dining"
            };
        }

        private async Task<bool> AppendReservationToSpreadsheet(ReservationDetails reservation)
        {
            try
            {
                var credentials = CreateGoogleCredentials();
                var sheetInfo = CreateGoogleSheetInfo();

                // Prepare row data
                var rowData = new List<object>
                {
                    reservation.CreatedAt.ToString("dd/MM/yyyy HH:mm:ss"), // A: Timestamp
                    reservation.FirstName,                                  // B: First Name
                    reservation.LastName,                                   // C: Last Name
                    reservation.ReservationTypeLabel,                       // D: Reservation Type
                    reservation.ReservationDate,                            // E: Date
                    reservation.ReservationTime,                            // F: Time
                    reservation.PartySize,                                  // G: Party Size
                    reservation.Notes,                                      // H: Notes
                    reservation.DepositAmount > 0 ? $"£{reservation.DepositAmount / 100.0:F2}" : "£0.00", // I: Deposit Amount
                    reservation.PaymentStatus,                              // J: Payment Status
                    reservation.StripeSessionId ?? "",                      // K: Stripe Session ID
                    $"{reservation.FirstName} {reservation.LastName}"       // L: Full Name
                };

                // // Append to spreadsheet
                GoogleSheetService.AppendRowData(credentials, sheetInfo, new List<List<object>> { rowData.Cast<object>().ToList() });

                _logger.LogInformation("Successfully appended reservation to spreadsheet");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to append reservation to spreadsheet");
                return false;
            }
        }

        private async Task<bool> CheckIfRowExists(string value)
        {
            var credentials = CreateGoogleCredentials();
            var sheetInfo = CreateGoogleSheetInfo();

            return GoogleSheetService.RowExists(credentials, sheetInfo, value, 10);
        }

        private static GoogleCredentialsRecord CreateGoogleCredentials()
        {
            return new GoogleCredentialsRecord(
                CredentialsJson: SystemConstants.GoogleCredentialsJson,
                User: SystemConstants.GoogleCredentialsUser,
                Scopes: new string[] { "https://www.googleapis.com/auth/spreadsheets" },
                ApplicationName: "Caribbean Kitchen Reservations"
            );
        }

        private static GoogleSheetInfoRecord CreateGoogleSheetInfo()
        {
            return new GoogleSheetInfoRecord(
                SpreadsheetId: SystemConstants.GoogleSheetInfoRecordSpreadsheetId,
                CellRange: "Reservations!A:L" // Include all columns A through L for comprehensive duplicate checking
            );
        }
    }
}