using System.Net;
using AremuCoreServices;
using AremuCoreServices.Helpers;
using AremuCoreServices.Models.CredentialRecords;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Project.Function.Helpers;
using Project.Function.Models;

namespace Project.Function.Endpoints
{
    public class ReservationTypesEndpoint
    {
        private readonly ILogger<ReservationTypesEndpoint> _logger;

        public ReservationTypesEndpoint(ILogger<ReservationTypesEndpoint> logger)
        {
            _logger = logger;
        }

        [Function("GetReservationTypes")]
        public async Task<HttpResponseData> GetReservationTypes(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "options", Route = "reservation/types")] HttpRequestData req)
        {
            _logger.LogInformation("Get reservation types endpoint called.");

            // Handle preflight OPTIONS request
            if (req.Method.Equals("OPTIONS", StringComparison.OrdinalIgnoreCase))
            {
                var optionsResponse = req.CreateResponse(HttpStatusCode.OK);
                ResponseHelper.AddCorsHeaders(optionsResponse);
                return optionsResponse;
            }

            try
            {
                var reservationTypes = await RetrieveReservationTypesFromSpreadsheet();

                if (reservationTypes == null || !reservationTypes.Any())
                {
                    return await ResponseHelper.NotFoundObjectResult(req, new
                    {
                        error = "No reservation types found",
                        details = "No reservation types are currently configured",
                        timestamp = DateTime.UtcNow.ToString("O")
                    });
                }
                
                _logger.LogInformation("Successfully retrieved {Count} reservation types", reservationTypes.Count);

                return await ResponseHelper.OkObjectResult(req, reservationTypes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error retrieving reservation types");
                return await ResponseHelper.InternalServerErrorObjectResult(req, new
                {
                    error = "Internal server error",
                    details = "An unexpected error occurred while retrieving reservation types",
                    timestamp = DateTime.UtcNow.ToString("O")
                });
            }
        }

        private async Task<List<ReservationType>> RetrieveReservationTypesFromSpreadsheet()
        {
            try
            {
                var credentials = CreateGoogleCredentials();
                var sheetInfo = CreateGoogleSheetInfo();

                // Get all data from the reservation types sheet
                var data = GoogleSheetService.GetData(credentials, sheetInfo);

                _logger.LogInformation("Retrieved {RowCount} rows from reservation types spreadsheet", data?.Count ?? 0);

                if (data == null || !data.Any())
                {
                    _logger.LogWarning("No data found in reservation types spreadsheet");
                    return new List<ReservationType>();
                }

                var reservationTypes = new List<ReservationType>();

                // Skip the first row (headers) and process each data row
                for (int i = 1; i < data.Count; i++)
                {
                    var row = data[i];
                    if (row == null || !row.Any())
                    {
                        _logger.LogWarning("Row {RowIndex} is null or empty", i);
                        continue;
                    }

                    try
                    {
                        _logger.LogInformation("Processing row {RowIndex} with {ColumnCount} columns", i, row.Count);
                        
                        var reservationType = new ReservationType
                        {
                            Label = row.Count > 0 ? row[0]?.ToString()?.Trim() ?? "" : "",
                            Value = row.Count > 1 ? row[1]?.ToString()?.Trim() ?? "" : "",
                            Description = row.Count > 2 ? row[2]?.ToString()?.Trim() ?? "" : "",
                            DepositAmount = row.Count > 3 && decimal.TryParse(row[3]?.ToString()?.Trim(), out var deposit) ? deposit : 0,
                            IsActive = row.Count > 4 && bool.TryParse(row[4]?.ToString()?.Trim(), out var isActive) ? isActive : true
                        };

                        _logger.LogInformation("Parsed reservation type: Label='{Label}', Value='{Value}', DepositAmount={DepositAmount}, IsActive={IsActive}", 
                            reservationType.Label, reservationType.Value, reservationType.DepositAmount, reservationType.IsActive);

                        // Only add active reservation types with valid data
                        if (reservationType.IsActive && !string.IsNullOrEmpty(reservationType.Label) && !string.IsNullOrEmpty(reservationType.Value))
                        {
                            reservationTypes.Add(reservationType);
                        }
                        else
                        {
                            _logger.LogWarning("Skipping reservation type due to invalid data: Label='{Label}', Value='{Value}', IsActive={IsActive}", 
                                reservationType.Label, reservationType.Value, reservationType.IsActive);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Failed to parse reservation type row {RowIndex}", i);
                        // Continue processing other rows
                    }
                }

                _logger.LogInformation("Successfully parsed {Count} reservation types from spreadsheet", reservationTypes.Count);
                
                // If no valid reservation types were parsed, return default types
                if (!reservationTypes.Any())
                {
                    _logger.LogWarning("No valid reservation types parsed from spreadsheet, returning default types");
                    return GetDefaultReservationTypes();
                }
                
                return reservationTypes;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to retrieve reservation types from spreadsheet, returning default types");
                return GetDefaultReservationTypes();
            }
        }

        private static List<ReservationType> GetDefaultReservationTypes()
        {
            return new List<ReservationType>
            {
                new ReservationType
                {
                    Label = "Regular Dining",
                    Value = "regular",
                    Description = "No deposit required",
                    DepositAmount = 0,
                    IsActive = true
                }
            };
        }

        private static GoogleCredentialsRecord CreateGoogleCredentials()
        {
            return new GoogleCredentialsRecord(
                CredentialsJson: SystemConstants.GoogleCredentialsJson,
                User: SystemConstants.GoogleCredentialsUser,
                Scopes: new string[] { "https://www.googleapis.com/auth/spreadsheets" },
                ApplicationName: "Caribbean Kitchen Reservation Types"
            );
        }

        private static GoogleSheetInfoRecord CreateGoogleSheetInfo()
        {
            return new GoogleSheetInfoRecord(
                SpreadsheetId: SystemConstants.GoogleSheetInfoRecordSpreadsheetId,
                CellRange: "ReservationTypes!A:F"
            );
        }
    }
}