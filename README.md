# Firebase Hosting & Web SDK — WebProject-V1

Quick steps to connect this project to your Firebase project and deploy the HTML/CSS.

Prerequisites
- Node.js + npm installed
- Firebase project already created (you provided: `web-project-efe6a`)

1) Install Firebase CLI

```powershell
npm install -g firebase-tools
```

2) Login and select your project

```powershell
firebase login
cd "c:\Users\hp\Desktop\Projec\WebProject-V1"
firebase init hosting

# During init:
# - Select the existing project `web-project-efe6a`
# - Set the public directory to `public` (recommended) or `.` (advanced)
# - Choose 'No' for single-page app unless you want SPA behavior
```

3) Prepare `public` folder (recommended)

I created a `public/` folder in the project and copied your HTML/CSS there. `DoctorDirectory.html` was copied as `public/index.html`.

If you prefer to keep files in the repository root instead, you can set the `public` value in `firebase.json` to `.` instead of `public`.

To view locally without deploying, run a simple static server (from project root):

```powershell
npx serve public
```

4) Add your Firebase web config into `DoctorDirectory.html`

- Open `DoctorDirectory.html` and replace the placeholder values in the `firebaseConfig` object with the real values from:
  Firebase Console → Project settings → Your apps → SDK setup and configuration

5) Deploy

```powershell
cd "c:\Users\hp\Desktop\Projec\WebProject-V1"
firebase deploy --only hosting
```

Notes
- If you want to use Firestore or Authentication, enable them in the Firebase Console and update the HTML/JS to call the APIs.
- For a Java backend (Admin SDK), see the `Java backend notes` section below (not implemented here).

## Java Backend

A Spring Boot backend is set up in `java-backend/` with Firebase Admin SDK for CRUD operations on doctors.

### Setup Backend

1. Go to `java-backend/`
2. Download Firebase service account key as `serviceAccountKey.json` in the folder.
3. Update the path in `DoctorDirectoryBackendApplication.java`.
4. Enable Firestore in Firebase Console.
5. Run: `mvn spring-boot:run`

### API Calls

The web app needs to be updated to call the backend APIs for dynamic data. For example, replace static doctor cards with fetch calls to `http://localhost:8080/api/doctors`.

For sign-in, use Firebase Auth in the web app, then send token to backend for verification.

For add/edit, submit forms via fetch to POST/PUT to the API.

---
Java backend notes
- Add `firebase-admin` to your Java project (via Maven/Gradle) and provide a service account JSON from
  Firebase Console → Project settings → Service accounts → Generate new private key.
- Keep `serviceAccountKey.json` out of source control.
