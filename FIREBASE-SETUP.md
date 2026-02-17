# Firebase Setup Guide for Disk Space Rental System

## Overview
This document provides step-by-step instructions for setting up Firebase for the Disk Space Rental application.

## Firebase Project Configuration

### Project Details
- **Project Name**: disk-space-rental-v3
- **Project ID**: disk-space-rental-v3
- **Region**: (Select based on your location)

## Step 1: Enable Firebase Services

### Authentication
1. Go to Firebase Console > Authentication
2. Enable Email/Password authentication
3. (Optional) Enable other providers (Google, GitHub, etc.)

### Firestore Database
1. Go to Firebase Console > Firestore Database
2. Create a new database in test mode (for development)
3. Start in test mode or production mode based on your security needs

### Firebase Storage
1. Go to Firebase Console > Storage
2. Create a new bucket (Note: Storage requires a Blaze (pay-as-you-go) plan)
3. Configure appropriate rules (see Security Rules section below)

## Step 2: Set Up Firestore Collections

The following collections have been created with sample data:

### Collections Structure
```
- users/
  - uid (document)
    - email: string
    - name: string
    - userType: 'renter' | 'provider'
    - createdAt: timestamp

- plans/
  - planId (document)
    - name: string
    - storage: number (in GB)
    - price: number
    - duration: number (in days)
    - status: 'active' | 'inactive'

- rentals/
  - rentalId (document)
    - userId: string
    - providerId: string
    - planId: string
    - status: 'active' | 'completed' | 'cancelled'
    - startDate: timestamp
    - endDate: timestamp

- files/
  - fileId (document)
    - userId: string
    - filename: string
    - filesize: number
    - uploadedAt: timestamp
    - status: 'pending' | 'uploaded' | 'deleted'
```

## Step 3: Configure Firestore Security Rules

The following security rules have been deployed:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Allow authenticated users to read plans
    match /plans/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid != null && false; // Only admin can write
    }
    
    // Allow authenticated users to manage rentals
    match /rentals/{rentalId} {
      allow read, write: if request.auth.uid == resource.data.userId || request.auth.uid == resource.data.providerId;
      allow create: if request.auth.uid != null && request.resource.data.userId == request.auth.uid;
    }
    
    // Allow authenticated users to manage files
    match /files/{fileId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid != null && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

## Step 4: Configure Firebase Storage Rules

When Storage is enabled, use these rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload and manage their own files
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## Step 5: Get Your Firebase Config

1. Go to Project Settings (gear icon)
2. Select your web app
3. Copy the Firebase config object
4. Paste it in `firebase-config.js`

## Step 6: Update firebase-config.js

Ensure your `firebase-config.js` contains:

```javascript
// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "disk-space-rental-v3.firebaseapp.com",
  projectId: "disk-space-rental-v3",
  storageBucket: "disk-space-rental-v3.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

## Step 7: Include Firebase Scripts in HTML Files

Add these scripts to all HTML files before closing </body> tag:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js"></script>

<!-- Firebase Config -->
<script src="firebase-config.js"></script>
<script src="app.js"></script>
```

## Step 8: Test Firebase Integration

1. Test Authentication:
   - Register a new user
   - Sign in with email/password
   - Verify user data is saved to Firestore

2. Test Firestore:
   - Create a rental
   - Read user data
   - Verify security rules prevent unauthorized access

3. Test Storage (when enabled):
   - Upload a file
   - Verify file appears in storage bucket
   - Test download functionality

## Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init`
4. Deploy: `firebase deploy`

## Important Notes

- Keep your Firebase config safe in production
- Use environment variables for sensitive data
- Monitor Firestore usage to avoid unexpected costs
- Test security rules thoroughly before production
- Enable Multi-Factor Authentication for admin accounts
- Set up automated backups for critical data

## Troubleshooting

### Authentication Issues
- Verify email/password authentication is enabled
- Check browser console for error messages
- Clear browser cache and try again

### Firestore Access Denied
- Check security rules match your use case
- Verify user is authenticated
- Check document structure matches rules

### Storage Issues
- Verify Storage bucket is created
- Check Storage rules allow the operation
- Ensure Blaze plan is active for Storage

## Additional Resources
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Storage Rules](https://firebase.google.com/docs/storage/security/start)
