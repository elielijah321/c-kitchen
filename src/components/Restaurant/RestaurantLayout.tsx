import { Box } from '@mantine/core';
import { RestaurantNavigation } from './RestaurantNavigation';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface RestaurantLayoutProps {
  children: React.ReactNode;
}

export function RestaurantLayout({ children }: RestaurantLayoutProps) {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <Box>
      <RestaurantNavigation />
      {children}
    </Box>
  );
}
