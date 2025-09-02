// Reservation types service for fetching reservation types from the API
export interface ReservationType {
  Label: string;
  Value: string;
  Description: string;
  DepositAmount: number;
  IsActive: boolean;
}

export class ReservationTypesService {
    private static readonly API_BASE_URL = 'https://c-kitchen-d4g8bvewf7f4eehe.uksouth-01.azurewebsites.net/api';
   //private static readonly API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7082/api';

  /**
   * Fetches all active reservation types from the API
   */
  static async getReservationTypes(): Promise<ReservationType[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/reservation/types`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as ReservationType[];

      console.log('Raw API data:', data);
      
      // Validate the data to ensure all options have required properties
      const validData = data.filter(type => 
        type && 
        typeof type.Value === 'string' && 
        type.Value.trim() !== '' &&
        typeof type.Label === 'string' && 
        type.Label.trim() !== '' &&
        type.IsActive === true
      );

      console.log('Validated data:', validData);
      
      return validData;
    } catch (error) {
      console.error('Reservation types service error:', error);
      // Return default types as fallback
      return this.getDefaultReservationTypes();
    }
  }

  /**
   * Returns default reservation types as fallback
   */
  private static getDefaultReservationTypes(): ReservationType[] {
    return [
      {
        Label: "Regular Dining",
        Value: "regular",
        Description: "No deposit required",
        DepositAmount: 0,
        IsActive: true
      }
    ];
  }
}
