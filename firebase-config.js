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
// Firebase Configuration for disk-space-rental-v3 project
const firebaseConfig = {
  apiKey: "AIzaSyDrExample_REPLACE_WITH_YOUR_API_KEY",
  authDomain: "disk-space-rental-v3.firebaseapp.com",
  projectId: "disk-space-rental-v3",
  storageBucket: "disk-space-rental-v3.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Enable offline persistence for Firestore
db.enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Offline persistence failed: multiple tabs open');
    } else if (err.code == 'unimplemented') {
      console.log('Offline persistence not available in this browser');
    }
  });

// Export for use in other files
// window.firebaseConfig = firebaseConfig;
