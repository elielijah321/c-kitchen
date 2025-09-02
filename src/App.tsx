import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './App.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { ReservationTypesProvider } from './contexts/ReservationTypesContext';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ReservationTypesProvider>
        <Router />
      </ReservationTypesProvider>
    </MantineProvider>
  );
}
