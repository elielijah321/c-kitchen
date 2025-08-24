import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RestaurantReservationsPage } from './pages/Restaurant/Reservations.page';
import { RestaurantReservationSuccessPage } from './pages/Restaurant/ReservationSuccess.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RestaurantReservationsPage />,
  },
  {
    path: '/success',
    element: <RestaurantReservationSuccessPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
