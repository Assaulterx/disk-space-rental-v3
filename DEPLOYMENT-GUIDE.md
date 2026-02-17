# Disk Space Rental System - Deployment Guide

## Quick Reference: Firebase Logout & Login

### Step 1: Logout Current Firebase Account

If you're already logged into Firebase CLI, logout first:

```bash
firebase logout
```

You'll see:
```
Successfully logged out from [previous-email@example.com]
```

### Step 2: Login with Your Account

```bash
firebase login
```

This will:
1. Open your browser automatically
2. Redirect to Firebase login page
3. Request authorization for Firebase CLI
4. Return to terminal when complete

Verify login:
```bash
firebase auth:list
```

---

## Complete Folder Structure After Clone

After cloning your repository, create the following structure:

```
disk-space-rental-v3/
├── public/                          # Firebase Hosting root folder
│   ├── index.html                   # Landing page
│   ├── dashboard.html               # User dashboard
│   ├── login.html                   # Login page
│   ├── register.html                # Registration page
│   ├── upload.html                  # File upload page
│   ├── files.html                   # Files management
│   ├── payment.html                 # Payment page
│   ├── styles.css                   # Global styles
│   ├── app.js                       # Main app logic
│   └── firebase-config.js           # Firebase configuration
├── .firebase/                        # Firebase cache (auto-generated)
├── .firebaserc                       # Firebase project config (auto-generated)
├── firebase.json                     # Firebase configuration file (auto-generated)
├── .gitignore                        # Git ignore file
├── package.json                      # Node.js dependencies (if using npm)
├── README.md                         # Project documentation
├── FIREBASE-SETUP.md                # Firebase setup instructions
├── DEPLOYMENT-GUIDE.md              # This file
└── node_modules/                     # Dependencies folder (auto-generated)
```

---

## Step-by-Step Deployment in CMD

### Prerequisites

Before starting, ensure you have:
- Node.js and npm installed
- Git installed
- Firebase CLI installed

### Step 1: Install Firebase CLI (If Not Already Installed)

```bash
npm install -g firebase-tools
```

Verify installation:
```bash
firebase --version
```

### Step 2: Clone Your Repository

```bash
git clone https://github.com/Assaulterx/disk-space-rental-v3.git
cd disk-space-rental-v3
```

### Step 3: Logout Any Existing Firebase Account

```bash
firebase logout
```

Expected output:
```
Successfully logged out from [email@example.com]
```

### Step 4: Login to Firebase with Your Account

```bash
firebase login
```

When the browser opens:
1. Select your Google account (ASSAULTER -X / piyushpjamdhade@gmail.com)
2. Click "Allow" to authorize Firebase CLI
3. You'll see: "Authorization complete! You may close this window."
4. Return to terminal - login is complete

### Step 5: Initialize Firebase (If Not Already Done)

If `firebase.json` and `.firebaserc` don't exist in your root:

```bash
firebase init
```

When prompted:
- **Which Firebase features do you want to set up?** → Select `Hosting`
- **What do you want to use as your public directory?** → Enter `public`
- **Configure as a single-page app?** → Enter `y` (yes)
- **File public/index.html already exists. Overwrite?** → Enter `n` (no)

### Step 6: Create Public Folder (If Not Exists)

```bash
mkdir public
```

Move your HTML, CSS, and JS files to public folder:

```bash
# Windows
move index.html public\
move dashboard.html public\
move login.html public\
move register.html public\
move upload.html public\
move files.html public\
move payment.html public\
move styles.css public\
move app.js public\
move firebase-config.js public

# Mac/Linux
mv index.html public/
mv dashboard.html public/
mv login.html public/
mv register.html public/
mv upload.html public/
mv files.html public/
mv payment.html public/
mv styles.css public/
mv app.js public/
mv firebase-config.js public/
```

### Step 7: Update firebase-config.js

Ensure your `public/firebase-config.js` contains:

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

### Step 8: Deploy to Firebase Hosting

```bash
firebase deploy
```

This will:
1. Build and optimize your files
2. Upload to Firebase Hosting
3. Show your live URL

Expected output:
```
=== Deploying to 'disk-space-rental-v3'...

i  deploying hosting
✔  hosting: local files uploaded successfully

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/disk-space-rental-v3/overview
Hosting URL: https://disk-space-rental-v3.firebaseapp.com
```

### Step 9: Access Your Deployed Site

Your site is now live at:
```
https://disk-space-rental-v3.firebaseapp.com
```

---

## Useful Firebase Hosting Commands

### View Deployment History

```bash
firebase hosting:channel:list
```

### Deploy with Custom Message

```bash
firebase deploy --message "Your deployment message here"
```

### View Logs

```bash
firebase hosting:requests 10
```

Shows last 10 requests to your site.

### Rollback to Previous Deployment

```bash
firebase hosting:releases:list
firebase hosting:rollback
```

### Check Deployment Status

```bash
firebase hosting:list
```

---

## Troubleshooting

### Issue: "You don't have permission to access this project"

**Solution:**
```bash
firebase logout
firebase login
firebase projects:list  # Verify disk-space-rental-v3 appears
```

### Issue: "public/ directory not found"

**Solution:**
Create the public folder:
```bash
mkdir public
# Move your files into public folder
```

### Issue: Files not updating after deploy

**Solution:**
```bash
# Clear browser cache
# or access with hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

# Then redeploy
firebase deploy --force
```

### Issue: "Firebase project not selected"

**Solution:**
Create `.firebaserc` in project root:
```json
{
  "projects": {
    "default": "disk-space-rental-v3"
  }
}
```

---

## Environment Variables

For better security, create a `.env` file in `public/` (optional):

```
FIREBASE_API_KEY=YOUR_API_KEY
FIREBASE_AUTH_DOMAIN=disk-space-rental-v3.firebaseapp.com
FIREBASE_PROJECT_ID=disk-space-rental-v3
FIREBASE_STORAGE_BUCKET=disk-space-rental-v3.appspot.com
FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
FIREBASE_APP_ID=YOUR_APP_ID
```

Note: For static hosting, Firebase Config must be in JS file (not .env).

---

## Post-Deployment Checklist

- [ ] All HTML pages load correctly
- [ ] Authentication works (login/register)
- [ ] Firestore data is accessible
- [ ] Firestore security rules are enforced
- [ ] CSS styles are applied
- [ ] JavaScript functions execute
- [ ] No console errors
- [ ] Mobile responsive design works
- [ ] All links work correctly
- [ ] Security rules prevent unauthorized access

---

## Summary Commands Quick Reference

```bash
# Logout old account
firebase logout

# Login new account
firebase login

# Navigate to project
cd disk-space-rental-v3

# Initialize Firebase (if needed)
firebase init

# Deploy to hosting
firebase deploy

# View live site
# Open: https://disk-space-rental-v3.firebaseapp.com
```

---

## Next Steps

1. Test your deployment thoroughly
2. Monitor Firestore usage in Firebase Console
3. Set up custom domain (optional)
4. Enable backup/disaster recovery
5. Monitor analytics and logs

For more details, refer to `FIREBASE-SETUP.md` and `README.md`.
