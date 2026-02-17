# Firebase Storage Security Rules

## Configuration for disk-space-rental-v3

This document describes the security rules needed for Firebase Cloud Storage in the disk-space-rental platform.

## Storage Rules

Add these rules to your Firebase Console under **Storage > Rules**:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload files
    match /users/{uid}/{allPaths=**} {
      allow read, write: if request.auth.uid == uid;
    }

    // Allow renters to upload files to their rental folder
    match /rentals/{rentalId}/{userId}/{allPaths=**} {
      allow read, write: if request.auth.uid == userId;
    }

    // Allow providers to manage their storage
    match /providers/{providerId}/{allPaths=**} {
      allow read, write: if request.auth.uid == providerId;
    }
  }
}
```

## Setup Instructions

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project `disk-space-rental-v3`
3. Navigate to **Storage** > **Rules** tab
4. Replace the existing rules with the above code
5. Click **Publish**

## Security Features

- ✅ Only authenticated users can access storage
- ✅ Users can only access their own files
- ✅ Providers can manage their storage independently
- ✅ File paths are organized by user and rental ID
- ✅ Maximum file size limits can be added if needed

## File Structure

Recommended storage structure:

```
gs://bucket-name/
├── users/{uid}/           # User profile data
├── rentals/{rentalId}/    # Rental-specific files
│   └── {userId}/          # User's files in this rental
└── providers/{uid}/       # Provider's storage files
```

## Additional Notes

- Update the rules in Firebase Console every time you make changes
- Test rules using the Rules Playground in Firebase Console
- Monitor storage usage in the Storage > Usage tab
- Set up Firestore backups for critical data

## Related Documentation

- [Firebase Storage Security Rules](https://firebase.google.com/docs/storage/security)
- [FIREBASE-SETUP.md](./FIREBASE-SETUP.md)
- [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
