/**
 * Disk Space Rental System - Main JavaScript File
 * 
 * This file contains common functionality and Firebase integration hooks.
 * To connect with Firebase:
 * 
 * 1. Create a Firebase project at https://console.firebase.google.com/
 * 2. Enable Authentication, Firestore, and Storage
 * 3. Copy your Firebase config and paste it in firebase-config.js
 * 4. Uncomment the Firebase integration code in each page
 */

// ==================== UTILITY FUNCTIONS ====================

/**
 * Toggle password visibility
 * @param {string} inputId - The ID of the password input
 * @param {HTMLElement} button - The toggle button element
 */
function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);
  const icon = button.querySelector('svg');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    `;
  } else {
    input.type = 'password';
    icon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    `;
  }
}

/**
 * Logout user
 */
function logout() {
  // TODO: Integrate with Firebase Auth
  // firebase.auth().signOut().then(() => {
  //   window.location.href = 'index.html';
  // });
  
  // For demo purposes
  console.log('User logged out');
  window.location.href = 'index.html';
}

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format date
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}

/**
 * Show notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, warning, info)
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 12px;
    color: white;
    font-weight: 500;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  // Set background color based on type
  const colors = {
    success: '#238636',
    error: '#da3633',
    warning: '#f0883e',
    info: '#58a6ff'
  };
  notification.style.backgroundColor = colors[type] || colors.info;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ==================== ANIMATIONS ====================

// Add keyframes for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ==================== SCROLL EFFECTS ====================

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ==================== INTERSECTION OBSERVER ====================

// Fade in elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards and sections
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.card, .stat-card, .dashboard-card');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});

// ==================== FORM VALIDATION ====================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result
 */
function validatePassword(password) {
  const result = {
    isValid: false,
    errors: []
  };
  
  if (password.length < 8) {
    result.errors.push('Password must be at least 8 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    result.errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    result.errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    result.errors.push('Password must contain at least one number');
  }
  
  result.isValid = result.errors.length === 0;
  return result;
}

// ==================== LOCAL STORAGE ====================

/**
 * Save data to local storage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get data from local storage
 * @param {string} key - Storage key
 * @returns {*} Stored value
 */
function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

/**
 * Remove data from local storage
 * @param {string} key - Storage key
 */
function removeFromStorage(key) {
  localStorage.removeItem(key);
}

// ==================== FIREBASE INTEGRATION TEMPLATE ====================

/*
// Import Firebase modules (add these to your HTML)
// <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js"></script>

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Auth state listener
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User signed in:', user.uid);
    
    // Update UI for logged in user
    updateUIForLoggedInUser(user);
  } else {
    // User is signed out
    console.log('User signed out');
    
    // Update UI for logged out user
    updateUIForLoggedOutUser();
  }
});

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
  // Show user-specific elements
  // Hide login/register buttons
  // Show logout button
}

// Update UI for logged out user
function updateUIForLoggedOutUser() {
  // Hide user-specific elements
  // Show login/register buttons
  // Hide logout button
}

// ==================== FIREBASE AUTH FUNCTIONS ====================

// Sign up with email and password
async function signUp(email, password, userData) {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Save additional user data to Firestore
    await firebase.firestore().collection('users').doc(user.uid).set({
      ...userData,
      email: user.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign in with email and password
async function signIn(email, password) {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign out
async function signOut() {
  try {
    await firebase.auth().signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ==================== FIRESTORE FUNCTIONS ====================

// Get user data
async function getUserData(userId) {
  try {
    const doc = await firebase.firestore().collection('users').doc(userId).get();
    if (doc.exists) {
      return { success: true, data: doc.data() };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Create storage plan
async function createPlan(planData) {
  try {
    const docRef = await firebase.firestore().collection('plans').add({
      ...planData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { success: true, planId: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Get available plans
async function getAvailablePlans() {
  try {
    const snapshot = await firebase.firestore()
      .collection('plans')
      .where('status', '==', 'active')
      .get();
    
    const plans = [];
    snapshot.forEach(doc => {
      plans.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, plans };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Create rental
async function createRental(rentalData) {
  try {
    const docRef = await firebase.firestore().collection('rentals').add({
      ...rentalData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { success: true, rentalId: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Get user's rentals
async function getUserRentals(userId) {
  try {
    const snapshot = await firebase.firestore()
      .collection('rentals')
      .where('userId', '==', userId)
      .where('status', '==', 'active')
      .get();
    
    const rentals = [];
    snapshot.forEach(doc => {
      rentals.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, rentals };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ==================== FIREBASE STORAGE FUNCTIONS ====================

// Upload file
async function uploadFile(file, userId) {
  try {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`users/${userId}/${file.name}`);
    
    const uploadTask = fileRef.put(file);
    
    // Return upload task for progress tracking
    return { success: true, uploadTask };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Get file download URL
async function getFileDownloadURL(path) {
  try {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(path);
    const url = await fileRef.getDownloadURL();
    return { success: true, url };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Delete file
async function deleteFile(path) {
  try {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(path);
    await fileRef.delete();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Get user's files
async function getUserFiles(userId) {
  try {
    const snapshot = await firebase.firestore()
      .collection('files')
      .where('userId', '==', userId)
      .orderBy('uploadedAt', 'desc')
      .get();
    
    const files = [];
    snapshot.forEach(doc => {
      files.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, files };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
*/

// ==================== DEBUG ====================

console.log('Disk Space Rental System - App loaded');
