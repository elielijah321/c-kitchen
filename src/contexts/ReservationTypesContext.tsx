import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ReservationTypesService, ReservationType } from '../services/reservationTypesService';

interface ReservationTypesContextType {
  reservationTypes: ReservationType[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ReservationTypesContext = createContext<ReservationTypesContextType | undefined>(undefined);

interface ReservationTypesProviderProps {
  children: ReactNode;
}

export function ReservationTypesProvider({ children }: ReservationTypesProviderProps) {
  const [reservationTypes, setReservationTypes] = useState<ReservationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReservationTypes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const types = await ReservationTypesService.getReservationTypes();
      setReservationTypes(types);
    } catch (err) {
      console.error('Failed to load reservation types:', err);
      setError(err instanceof Error ? err.message : 'Failed to load reservation types');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReservationTypes();
  }, []);

  const value: ReservationTypesContextType = {
    reservationTypes,
    isLoading,
    error,
    refetch: loadReservationTypes,
  };

  return (
    <ReservationTypesContext.Provider value={value}>
      {children}
    </ReservationTypesContext.Provider>
  );
}

export function useReservationTypes() {
  const context = useContext(ReservationTypesContext);
  if (context === undefined) {
    throw new Error('useReservationTypes must be used within a ReservationTypesProvider');
  }
  return context;
}
