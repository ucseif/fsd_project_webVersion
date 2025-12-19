# Online Faculty Staff Directory – Admin Web Dashboard

This repository contains the **Web Admin Dashboard** for the *Online Faculty Staff Directory for Multi University* system.  
The dashboard is used exclusively by administrators to manage faculty data, while students access the system through a separate mobile application built with Flutter.

---

## 📌 Project Overview

The **Online Faculty Staff Directory** is an academic system designed to simplify access to university faculty information.  
It allows students to browse, search, and view faculty members across multiple universities, while providing administrators with a centralized dashboard to manage all faculty records.

This repository focuses on the **web-based admin panel**, which is a core part of the system architecture.

---

## 🧠 System Architecture (Mental Model)

The system is divided into three main components:

Admin (Web Dashboard)
   |
   |  Create / Update / Delete
   v
Firebase (Firestore + Storage + Auth)
   ^
   |  Read / Search (Read-only)
   |
Student (Flutter Mobile App)
The Web Application is used only by administrators.

The Mobile Application is used only by students.

Firebase acts as a shared backend between both platforms.

🌐 Web Application (This Repository)
Purpose
The web application serves as an Admin Dashboard that allows authorized administrators to manage faculty data efficiently.

Admin Capabilities
Admin authentication

Add new faculty members

Edit faculty details

Delete faculty records

Assign faculty to universities

Upload faculty profile images

Manage and maintain centralized academic data

⚠️ The web application is not accessible to students.

📱 Mobile Application (Student App)
Implemented in a separate repository

Technologies
Flutter

Dart

Firebase Firestore

Student Capabilities
Access the app without login

View faculty members across multiple universities

Search faculty by:

Name

Department

Courses taught

Area of expertise

University

View detailed faculty profiles (read-only)

Students cannot add, edit, or delete any data.

🔥 Backend & Services
The system uses Firebase as a Backend-as-a-Service (BaaS):

Firestore – stores faculty and university data

Firebase Authentication – admin login (web only)

Firebase Storage – faculty profile images

Real-time synchronization – updates made by admins appear instantly in the mobile app

🛠️ Technologies Used (Web)
HTML5

CSS3

JavaScript (Vanilla JS)

Firebase Firestore

Firebase Authentication

Firebase Hosting

🔐 Security Notes
For academic and demonstration purposes, Firestore security rules are currently configured with open read/write access.
This simplifies development and testing.

In production or future versions, role-based access control can be enforced using:

Firebase Authentication

Firestore Security Rules

Custom admin roles

📂 Project Structure
text
Copy code
WebProject/
│
├── css/                 # Stylesheets
├── js/                  # JavaScript logic (Firebase, admin actions)
├── index.html           # Admin login / entry page
├── DoctorDirectory.html # Faculty management page
├── firebase.json        # Firebase configuration
├── firestore.rules      # Firestore security rules
├── firestore.indexes.json
├── .firebaserc
├── .gitignore
└── README.md
🚀 Future Enhancements
Paid consultation booking between students and faculty

Online payment integration

Real-time chat between students and faculty

Advanced role-based access control

Analytics dashboard for admin usage

🎓 Academic Context
This project was developed as part of the Software Engineering course.
It follows standard software engineering practices, including:

Software Requirements Specification (SRS)

Use Case Modeling

UML Diagrams

Modular system design

📄 License
