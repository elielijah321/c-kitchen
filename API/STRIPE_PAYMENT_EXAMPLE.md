# Stripe Payment Endpoint

## Overview
The Stripe Payment endpoint allows you to create Stripe checkout sessions by accepting customer input and processing payments through Stripe.

## Endpoint Details
- **URL**: `POST /api/payment/create`
- **Authorization**: Anonymous (no authentication required)
- **Content-Type**: `application/json`

## Request Format

### Required Fields
```json
{
  "productName": "string",      // Name of the product/service
  "amountInPence": 1500,        // Amount in pence (1500 = £15.00)
  "quantity": 1                 // Quantity of items
}
```

### Optional Fields
```json
{
  "currency": "GBP",            // Currency code (default: GBP)
  "customerEmail": "customer@example.com",
  "successUrl": "https://yoursite.com/success",
  "cancelUrl": "https://yoursite.com/cancel",
  "metadata": {                 // Custom metadata
    "orderId": "12345",
    "source": "website"
  }
}
```

## Example Requests

### Basic Payment Request
```json
{
  "productName": "Restaurant Reservation Fee",
  "amountInPence": 2000,
  "quantity": 1
}
```

### Full Payment Request
```json
{
  "productName": "Premium Dinner Package",
  "amountInPence": 7500,
  "quantity": 2,
  "currency": "GBP",
  "customerEmail": "john.doe@example.com",
  "successUrl": "https://c-kitchen.com/reservation-success",
  "cancelUrl": "https://c-kitchen.com/reservation-cancel",
  "metadata": {
    "reservationDate": "2024-02-15",
    "partySize": "4",
    "specialRequests": "Vegetarian options"
  }
}
```

## Response Format

### Success Response (200 OK)
```json
{
  "success": true,
  "checkoutUrl": "https://checkout.stripe.com/c/pay/cs_sessionid#fidkdWxOYHwnPyd...",
  "sessionId": "cs_test_sessionid123",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error Response (400 Bad Request)
```json
{
  "error": "Validation failed",
  "details": "ProductName is required; AmountInPence must be greater than 0",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error Response (500 Internal Server Error)
```json
{
  "error": "Internal server error",
  "details": "An unexpected error occurred while processing your payment request",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Usage Examples

### JavaScript/TypeScript (Frontend)
```javascript
const createPayment = async (paymentData) => {
  try {
    const response = await fetch('/api/payment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Redirect to Stripe checkout
      window.location.href = result.checkoutUrl;
    } else {
      console.error('Payment creation failed:', result.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Usage
createPayment({
  productName: "Table Reservation",
  amountInPence: 1500,
  quantity: 1,
  customerEmail: "customer@example.com"
});
```

### cURL
```bash
curl -X POST https://your-function-app.azurewebsites.net/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Restaurant Booking",
    "amountInPence": 2500,
    "quantity": 1,
    "customerEmail": "test@example.com"
  }'
```

## Notes
- All amounts are in pence (smallest currency unit)
- The endpoint uses the Stripe API key configured in `SystemConstants.StripeApiKey`
- Default success and cancel URLs are used if not provided
- Customer email is optional but recommended for receipt delivery
- Metadata can be used to store additional information about the payment

