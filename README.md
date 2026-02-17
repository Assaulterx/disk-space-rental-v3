# disk-space-rental-v3

A decentralized disk space rental platform built with Firebase and modern web technologies.

## Features

- **User Authentication**: Secure registration and login with Firebase Auth
- **Dual User Roles**: Support for renters and providers
- **Space Management**: Providers can list available disk space
- **File Management**: Renters can upload and manage files
- **Payment Integration**: Payment processing for rentals
- **Real-time Dashboard**: Live updates with Firestore
- **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Firebase (Firestore, Authentication, Storage, Hosting)
- **Database**: Cloud Firestore
- **Storage**: Firebase Cloud Storage
- **Authentication**: Firebase Authentication

## Project Structure

```
disk-space-rental-v3/
├── index.html           # Landing/home page
├── register.html        # User registration
├── login.html          # User login
├── dashboard.html      # User dashboard
├── files.html          # File management
├── upload.html         # File upload
├── payment.html        # Payment page
├── app.js              # Main application logic
├── firebase-config.js  # Firebase configuration
├── styles.css          # Styling
└── README.md           # This file
```

## Firebase Collections

### Users Collection
Stores user account information
- `uid`: User ID (auto)
- `email`: Email address
- `fullName`: User's full name
- `phone`: Phone number
- `role`: 'renter' or 'provider'
- `createdAt`: Account creation timestamp

### Plans Collection
Stores available rental plans
- `pricePerMonth`: Price in currency
- `providerId`: Provider's user ID
- `storageGB`: Storage size in GB

### Rentals Collection
Stores active rental agreements
- `renterUserId`: Renter's user ID
- `providerUserId`: Provider's user ID
- `planId`: Reference to plan
- `status`: 'active', 'completed', 'cancelled'
- `startDate`: Rental start date
- `endDate`: Rental end date

### Files Collection
Stores uploaded file information
- `filename`: Name of the file
- `rentalId`: Associated rental ID
- `uploadedAt`: Upload timestamp
- `fileSize`: Size in bytes
- `fileUrl`: Storage URL

## Getting Started

1. Clone the repository
2. Configure Firebase credentials in `firebase-config.js`
3. Deploy to Firebase Hosting
4. Access the application via the provided URL

## Installation

```bash
npm install -g firebase-tools
firebase init
firebase deploy
```

## Security Rules

Firestore and Storage security rules are configured to:
- Allow users to read/write only their own data
- Restrict admin operations
- Validate data types and formats

## License

MIT License

## Support

For issues and questions, please create an issue on GitHub.
