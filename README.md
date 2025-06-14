# ParkReserve - Parking Reservation System

A modern, secure parking reservation system built with React/Next.js frontend and NestJS/GraphQL backend. The system allows users to reserve parking spots and provides administrators with comprehensive management tools.

## 🚀 Features

### User Features
- **Easy Reservation Process**: Simple form-based parking spot reservation
- **Real-time Slot Availability**: View available parking slots in real-time
- **Instant Confirmation**: Get immediate reservation confirmation with unique 6-digit codes
- **Public Reservation Status**: Check reservation status without authentication
- **Responsive Design**: Mobile-friendly interface with dark/light theme support

### Admin Features
- **Comprehensive Dashboard**: Manage all reservations from a centralized panel
- **Real-time Updates**: Auto-refresh functionality for live reservation monitoring
- **Reservation Management**: Approve, edit, or revoke reservations
- **Secure Authentication**: Password-protected admin access
- **Detailed Reservation View**: Access to all customer information and reservation details

## 🛡️ Security Features

### Data Encryption
- **AES-256-GCM Encryption**: All sensitive data (license plates, driver's license codes, phone numbers) are encrypted at rest
- **Secure Key Management**: Environment-based encryption key configuration
- **Field-level Encryption**: Individual field encryption for granular security control

### Authentication & Authorization
- **Admin Authentication**: Secure admin panel access with password protection
- **Session Management**: localStorage-based authentication state management
- **Protected Routes**: Admin-only access to sensitive reservation data

### Data Privacy
- **Selective Data Exposure**: Public endpoints only expose necessary information (reservation codes, status)
- **Encrypted Storage**: Sensitive personal information encrypted in SQLite database
- **Secure Communication**: CORS-enabled secure API communication

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.3 (React 19)
- **Styling**: Tailwind CSS 4.0 with dark mode support
- **GraphQL Client**: Apollo Client 3.13.8
- **TypeScript**: Full type safety throughout the application
- **State Management**: React hooks and Apollo Client cache

### Backend
- **Framework**: NestJS 11.0.1
- **API**: GraphQL with Apollo Server
- **Database**: SQLite with TypeORM 0.3.24
- **Encryption**: Node.js Crypto module (AES-256-GCM/CBC)
- **Authentication**: Simple password-based admin authentication

### Development Tools
- **Linting**: ESLint with TypeScript support
- **Code Formatting**: Prettier
- **Testing**: Jest (configured but tests need implementation)
- **Package Management**: npm

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd parking-reservation
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create environment file (optional)
cp .env.example .env
# Edit .env with your encryption key: ENCRYPTION_KEY=your-32-character-key-here

# Start development server
npm run start:dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **GraphQL Playground**: http://localhost:3001/graphql

## 🗄️ Database Schema

### Reservation Entity
```typescript
{
  id: number (Primary Key)
  name: string
  licensePlate: string (Encrypted)
  driversLicenseCode: string (Encrypted)
  phoneNumber: string (Encrypted)
  reservationCode: string (Unique 6-digit code)
  parkingSection: string (A, B, C, D)
  slotNumber: number (1-5)
  approved: boolean
}
```

## 🔐 Security Configuration

### Environment Variables
```bash
# Backend (.env)
ENCRYPTION_KEY=your-32-character-encryption-key-here
PORT=3001
```

### Admin Credentials
- **Default Password**: `admin123` (change in production)
- **Location**: [`frontend/src/app/admin-login/page.tsx`](frontend/src/app/admin-login/page.tsx)

## 📱 Application Structure

### Frontend Routes
- `/` - Home page with reservation form
- `/reservations` - Public reservation status list
- `/admin-login` - Admin authentication
- `/admin` - Admin dashboard (protected)
- `/about` - About page
- `/contact` - Contact information

### GraphQL API Endpoints
- `reservations` - Get all reservations (admin only)
- `publicReservations` - Get public reservation data
- `availableSlots` - Get available parking slots
- `createReservation` - Create new reservation
- `updateReservation` - Update existing reservation

## 🚦 Parking Slot Configuration

- **Sections**: A, B, C, D (4 sections)
- **Slots per Section**: 1-5 (5 slots each)
- **Total Capacity**: 20 parking slots
- **Conflict Prevention**: Automatic slot availability checking

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests (to be implemented)
cd frontend
npm run test
```

## 🚀 Production Deployment

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
npm run start
```

### Security Considerations for Production
1. Change default admin password
2. Use environment-specific encryption keys
3. Enable HTTPS
4. Configure proper CORS settings
5. Implement rate limiting
6. Add input validation and sanitization
7. Set up proper logging and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- [ ] Email notification system
- [ ] SMS confirmation
- [ ] Payment integration
- [ ] Time-based reservations
- [ ] QR code generation
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-location support