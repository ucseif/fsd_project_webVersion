# Online Faculty Staff Directory for Multi University

A web-based academic system that allows students to browse, search, and view university faculty members across multiple universities.  
The system provides an admin dashboard for managing faculty profiles and a public interface for students to access faculty information easily.

---

## 📌 Project Overview

The **Online Faculty Staff Directory** is designed as an academic project for the _Software Engineering_ course.  
Its main goal is to improve accessibility to faculty information and reduce the time and effort required for students to find academic staff details.

---

## 🎯 Key Features

### Student (Public Access)

- View faculty members without login
- Search faculty by:
  - Name
  - Department
  - Courses taught
  - Area of expertise
- View detailed faculty profiles

### Admin (Web Dashboard)

- Admin authentication
- Add new faculty members
- Update existing faculty profiles
- Delete faculty records
- Manage faculty data centrally

---

## 🛠️ Technologies Used

- **Frontend:**

  - HTML5
  - CSS3
  - JavaScript (Vanilla JS)

- **Backend & Services:**
  - Firebase Firestore (Database)
  - Firebase Authentication
  - Firebase Hosting

---

## 🔐 Security Notes

For academic demonstration purposes, the Firestore database is configured with open read/write rules.  
Role-based access control and advanced security measures can be implemented in future versions using Firebase Authentication and Security Rules.

---

## 📂 Project Structure

```text
WebProject-V4/
│
├── css/                 # Stylesheets
├── js/                  # JavaScript logic (auth, firebase, doctors, utils)
├── index.html           # Entry / login page
├── DoctorDirectory.html # Faculty listing page
├── firebase.json        # Firebase configuration
├── firestore.rules      # Firestore security rules
├── firestore.indexes.json
├── .firebaserc
├── .gitignore
└── README.md
```
