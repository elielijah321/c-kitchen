// Payment service for handling Stripe payments
export interface PaymentRequest {
  productName: string;
  amountInPence: number;
  quantity: number;
  currency?: string;
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, string>;
}

export interface PaymentResponse {
  success: boolean;
  checkoutUrl?: string;
  sessionId?: string;
  errorMessage?: string;
  timestamp: string;
}

export interface PaymentErrorResponse {
  error: string;
  details?: string;
  timestamp: string;
}

export interface ReservationSuccessRequest {
  firstName?: string;
  lastName?: string;
  reservationType?: string;
  reservationDate?: string;
  reservationTime?: string;
  partySize?: number;
  notes?: string;
  depositAmount?: number;
  stripeSessionId?: string;
}

export interface ReservationSuccessResponse {
  success: boolean;
  message?: string;
  reservationId?: string;
  reservationDetails?: {
    firstName: string;
    lastName: string;
    reservationType: string;
    reservationTypeLabel: string;
    reservationDate: string;
    reservationTime: string;
    partySize: number;
    notes: string;
    depositAmount: number;
    paymentStatus: string;
    stripeSessionId?: string;
  };
  errorMessage?: string;
  timestamp: string;
}

export class PaymentService {
  private static readonly API_BASE_URL = 'https://c-kitchen-d4g8bvewf7f4eehe.uksouth-01.azurewebsites.net/api';

  //private static readonly API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7082/api';

  /**
   * Creates a Stripe checkout session for the given payment request
   */
  static async createPaymentSession(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API error response
        const errorData = data as PaymentErrorResponse;
        return {
          success: false,
          errorMessage: errorData.details || errorData.error || 'Payment creation failed',
          timestamp: new Date().toISOString(),
        };
      }

      return data as PaymentResponse;
    } catch (error) {
      console.error('Payment service error:', error);
      return {
        success: false,
        errorMessage: 'Network error: Unable to process payment request',
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Redirects to Stripe checkout
   */
  static redirectToCheckout(checkoutUrl: string): void {
    window.location.href = checkoutUrl;
  }

  /**
   * Calculates reservation fee based on party size
   * £15 base fee + £5 per additional person over 2
   */
  static calculateReservationFee(partySize: number): number {
    const baseFee = 1500; // £15.00 in pence
    const additionalPersonFee = 500; // £5.00 in pence per person
    const additionalPeople = Math.max(0, partySize - 2);
    
    return baseFee + (additionalPeople * additionalPersonFee);
  }

  /**
   * Formats amount in pounds to display currency
   */
  static formatAmount(amountInPounds: number, currency: string = 'GBP'): string {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
    }).format(amountInPounds);
  }

  /**
   * Saves reservation details to the backend
   */
  static async saveReservation(reservationData: ReservationSuccessRequest): Promise<ReservationSuccessResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/reservation/success`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API error response
        const errorData = data as PaymentErrorResponse;
        return {
          success: false,
          errorMessage: errorData.details || errorData.error || 'Failed to save reservation',
          timestamp: new Date().toISOString(),
        };
      }

      return data as ReservationSuccessResponse;
    } catch (error) {
      console.error('Reservation save error:', error);
      return {
        success: false,
        errorMessage: 'Network error: Unable to save reservation',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
