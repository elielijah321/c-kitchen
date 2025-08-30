using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project.Function.Models
{
    public class PaymentRequest
    {
        [Required]
        public string ProductName { get; set; } = string.Empty;
        
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Amount must be greater than 0")]
        public int AmountInPence { get; set; }
        
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }
        
        public string Currency { get; set; } = "GBP";
        
        public string? CustomerEmail { get; set; }
        
        public string? SuccessUrl { get; set; }
        
        public string? CancelUrl { get; set; }
        
        public Dictionary<string, string>? Metadata { get; set; }
    }

    public class PaymentResponse
    {
        public bool Success { get; set; }
        public string? CheckoutUrl { get; set; }
        public string? SessionId { get; set; }
        public string? ErrorMessage { get; set; }
        public string Timestamp { get; set; } = string.Empty;
    }

    public class PaymentErrorResponse
    {
        public string Error { get; set; } = string.Empty;
        public string? Details { get; set; }
        public string Timestamp { get; set; } = string.Empty;
    }

    public class ReservationSuccessRequest
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ReservationType { get; set; }
        public string? ReservationDate { get; set; }
        public string? ReservationTime { get; set; }
        public int? PartySize { get; set; }
        public string? Notes { get; set; }
        public int? DepositAmount { get; set; }
        public string? StripeSessionId { get; set; }
    }

    public class ReservationDetails
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string ReservationType { get; set; } = string.Empty;
        public string ReservationTypeLabel { get; set; } = string.Empty;
        public string ReservationDate { get; set; } = string.Empty;
        public string ReservationTime { get; set; } = string.Empty;
        public int PartySize { get; set; }
        public string Notes { get; set; } = string.Empty;
        public int DepositAmount { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
        public string? StripeSessionId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

