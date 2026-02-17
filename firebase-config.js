/**
 * Firebase Configuration Template
 * 
 * Instructions:
 * 1. Go to https://console.firebase.google.com/ and create a new project
 * 2. Enable the following services:
 *    - Authentication (Email/Password provider)
 *    - Cloud Firestore
 *    - Cloud Storage
 * 3. Go to Project Settings > General > Your apps
 * 4. Click on the web icon (</>) to add a web app
 * 5. Copy the firebaseConfig object and paste it below
 * 6. Include this file in your HTML before app.js:
 *    <script src="firebase-config.js"></script>
 */

// Replace this with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
// Uncomment this after adding your config
// firebase.initializeApp(firebaseConfig);

// Export for use in other files
// window.firebaseConfig = firebaseConfig;
