using System;

namespace Project.Function.Models
{
    public class ReservationType
    {
        public string Label { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal DepositAmount { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
