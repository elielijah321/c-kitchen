# Caribbean Kitchen - Restaurant Booking Website

A modern restaurant booking website for Caribbean Kitchen, featuring authentic Caribbean cuisine and online reservations.

## Features

- **Restaurant Showcase**: Beautiful homepage showcasing authentic Caribbean dishes and restaurant atmosphere
- **Online Menu**: Interactive menu with categorized dishes, pricing, and dietary indicators
- **Reservation System**: Complete booking system with date/time selection and party size management
- **Payment Integration**: Stripe integration for reservation deposits (optional)
- **Contact & Information**: Complete contact information, hours, and location details
- **Responsive Design**: Mobile-friendly design that works on all devices
- **Modern UI**: Built with Mantine UI components and custom Caribbean-themed styling

## Technology Stack

### Frontend
- **React 19** with TypeScript
- **Mantine UI** for components and styling
- **React Router** for navigation
- **Framer Motion** for animations
- **Vite** for fast development and building

### Backend API (.NET)
- **Azure Functions** for serverless API endpoints
- **Entity Framework Core** for database operations
- **Stripe Integration** for payment processing
- **SQL Server** database

## Getting Started

### Prerequisites
- Node.js 20+ 
- .NET 6.0+ SDK
- SQL Server (for database)

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

### Backend Setup

1. Navigate to the API directory:
```bash
cd API
```

2. Restore packages:
```bash
dotnet restore
```

3. Update database connection string in `local.settings.json`

4. Run database migrations:
```bash
dotnet ef database update
```

5. Start the API:
```bash
func start
```

## Project Structure

```
├── src/
│   ├── components/
│   │   └── Restaurant/          # Restaurant-specific components
│   ├── pages/
│   │   └── Restaurant/          # All restaurant pages
│   └── assets/                  # Images and static assets
├── API/
│   ├── Endpoints/               # API endpoints
│   ├── Models/                  # Database models
│   ├── Database/                # Database context and repositories
│   └── SampleData/              # Sample data scripts
```

## Pages

- **Home** (`/`) - Restaurant showcase with featured dishes
- **Menu** (`/menu`) - Complete menu with categories and pricing
- **Reservations** (`/reservations`) - Online booking form
- **About** (`/about`) - Restaurant story and team information
- **Contact** (`/contact`) - Contact form and restaurant details

## API Endpoints

- `POST /api/PostReservation` - Create new reservation
- `GET /api/GetAvailableTimeSlots` - Get available booking slots
- `GET /api/GetAllReservations` - Get reservation list (admin)
- `GET /api/GetBusiness` - Get restaurant information

## Database Models

### Business
Restaurant information including:
- Basic details (name, address, contact)
- Operating hours and capacity
- Caribbean cuisine specifics
- Online booking settings

### Reservation
Customer bookings with:
- Customer details
- Date, time, and party size
- Special requests and dietary notes
- Status tracking
- Payment integration

### BusinessOffering
Menu categories and pricing:
- Lunch, dinner, and special menus
- Pricing per person
- Availability schedules

## Styling

The application uses a Caribbean-inspired color scheme:
- **Primary Green**: Caribbean sea colors
- **Accent Orange**: Tropical sunset tones
- **Clean whites and grays**: For readability

## Deployment

### Frontend (Static Web Apps)
The frontend can be deployed to Azure Static Web Apps or any static hosting service.

### Backend (Azure Functions)
The API is designed to run on Azure Functions for serverless scaling.

## Sample Data

Use the provided SQL script in `API/SampleData/RestaurantData.sql` to populate your database with sample restaurant data.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions about the booking system, contact:
- Email: support@caribbeankitchen.co.uk
- Phone: +44 20 7123 4567