# Frontend Payment Integration

## Overview
The frontend has been successfully integrated with the Stripe payment endpoint. When users submit the reservation form, it now creates a Stripe checkout session and redirects them to complete the payment.

## What was implemented:

### 1. Payment Service (`src/services/paymentService.ts`)
- **PaymentService class**: Handles all payment-related operations
- **API Integration**: Communicates with the `/api/payment/create` endpoint
- **Fee calculation**: Dynamic pricing based on party size (£15 base + £5 per additional person)
- **Error handling**: Comprehensive error handling with user-friendly messages
- **Currency formatting**: Proper GBP formatting for display

### 2. Updated Reservation Form (`src/pages/Restaurant/Reservations.page.tsx`)
- **Dynamic fee display**: Shows reservation fee that updates with party size
- **Payment integration**: Creates Stripe checkout session on form submission
- **Error handling**: Displays payment errors to users
- **Enhanced UX**: Loading states and clear payment button
- **Metadata passing**: Sends all reservation details to Stripe for tracking

### 3. Enhanced Success Page (`src/pages/Restaurant/ReservationSuccess.page.tsx`)
- **URL parameter handling**: Displays reservation details from Stripe redirect
- **Dynamic content**: Shows actual reservation date, time, party size, and email
- **Better UX**: Confirmation details are now populated from the booking

## How it works:

### 1. User Flow
1. User fills out reservation form
2. Fee is calculated dynamically based on party size
3. User clicks "Pay £X.XX & Reserve Table"
4. System creates Stripe checkout session with reservation details
5. User is redirected to Stripe checkout
6. After successful payment, user returns to success page with booking details

### 2. Payment Process
```typescript
// Fee calculation
const fee = PaymentService.calculateReservationFee(partySize);

// Payment request
const paymentRequest = {
  productName: "Table Reservation - John Doe",
  amountInPence: 2000, // £20.00 for 3 people
  quantity: 1,
  currency: "GBP",
  customerEmail: "john@example.com",
  successUrl: "https://yoursite.com/success?date=15/01/2024&time=19:00...",
  cancelUrl: "https://yoursite.com/reservations",
  metadata: {
    // All reservation details stored in Stripe metadata
  }
};
```

### 3. Data Flow
```
Frontend Form → PaymentService → API Endpoint → Stripe → Checkout → Success Page
     ↓              ↓              ↓           ↓        ↓          ↓
  User Input → Payment Request → Stripe API → Session → Payment → Confirmation
```

## Configuration

### Environment Variables
Create a `.env.local` file in the project root:
```bash
# API Configuration  
VITE_API_BASE_URL=http://localhost:7071/api

# For production, update to your deployed API URL:
# VITE_API_BASE_URL=https://your-function-app.azurewebsites.net/api
```

### Development Setup
1. Ensure your Azure Functions API is running locally on port 7071
2. Set the correct API URL in environment variables
3. Test the integration with Stripe test mode

## Features

### ✅ Implemented
- Dynamic fee calculation based on party size
- Real-time fee updates when party size changes
- Stripe checkout session creation
- Comprehensive error handling
- Success page with actual booking details
- Responsive design with Mantine UI components
- Loading states and user feedback

### 🎯 Pricing Structure
- **Base fee**: £15.00 for up to 2 people
- **Additional guests**: £5.00 per person over 2
- **Examples**:
  - 2 people: £15.00
  - 4 people: £25.00 (£15 + 2×£5)
  - 6 people: £35.00 (£15 + 4×£5)

### 🔒 Security Features
- Input validation on both frontend and backend
- Secure API communication
- Error handling without exposing sensitive data
- Stripe's secure checkout process

## Testing

### Frontend Testing
```bash
# Run the development server
npm run dev

# Test the reservation form with different party sizes
# Verify fee calculations update correctly
# Test form validation
# Test payment integration (use Stripe test mode)
```

### Integration Testing
1. Fill out reservation form
2. Verify fee calculation is correct
3. Submit form and check Stripe checkout loads
4. Complete test payment
5. Verify success page shows correct details
6. Check Stripe dashboard for payment and metadata

## Error Handling

The integration includes comprehensive error handling for:
- **Network errors**: API unavailable or timeout
- **Validation errors**: Invalid form data
- **Payment errors**: Stripe API failures
- **User-friendly messages**: Clear error descriptions for users

## Next Steps

1. **Configure production API URL** in environment variables
2. **Set up Stripe webhooks** for payment confirmation (optional)
3. **Add reservation management** to track bookings in your database
4. **Customize success/cancel URLs** for your domain
5. **Test thoroughly** in both development and production environments

## Support

The payment integration is now complete and ready for use. The system will:
- Calculate fees dynamically
- Create secure Stripe checkout sessions
- Handle errors gracefully
- Provide a smooth user experience
- Pass all reservation details through the payment process

