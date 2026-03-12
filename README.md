# 🍬 Sweet Shop Management System

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/keshav1511k/sweet-shop-management)

A full-stack Sweet Shop Management System built using React, Node.js, Express, Prisma, and SQLite.
The application allows authenticated users to browse, search, and purchase sweets, while administrators can manage inventory by restocking items.

This project was developed as a real-world full-stack application, focusing on authentication, role-based authorization, clean API design, and frontend–backend integration.

---

## 📸 Final Working Condition

The project is fully functional and stable.
The final working UI (attached as a screenshot in the submission) demonstrates:

- Dashboard layout
- Logout functionality
- Search and filter section
- Sweet listings
- Purchase action
- Admin restock functionality
  <img width="1470" height="923" alt="Screenshot 2025-12-13 at 3 53 25 PM" src="https://github.com/user-attachments/assets/c4ae8f3f-4fd1-4800-b966-33bdbe460a67" />


---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based login system
- Token stored securely on the client
- Role-based access control:
  - USER → can view and purchase sweets
  - ADMIN → can purchase and restock sweets

### 🍭 Sweet Management
- View all available sweets
- Search sweets by:
  - Name
  - Category
  - Minimum price
  - Maximum price
- Purchase sweets (automatically updates quantity)
- Restock sweets (admin-only operation)

### 🌐 Frontend (React)
- Built using React with Vite
- Axios for API communication
- React Router for navigation and protected routes
- State management using React hooks
- UI styled using App.css and style.css
- Clean and functional dashboard interface

### ⚙️ Backend (Node.js)
- RESTful APIs built with Express
- Prisma ORM with SQLite database
- JWT authentication middleware
- Role-based authorization middleware
- Modular folder structure
- Automated API tests using Jest

---

## 🧱 Tech Stack

### Frontend
- React
- Vite
- Axios
- React Router
- jwt-decode
- CSS (App.css, style.css)

### Backend
- Node.js
- Express.js
- Prisma ORM
- SQLite
- JSON Web Tokens (JWT)
- Jest (testing)

---

## 📁 Project Structure

sweet-shop-management/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── style.css
│   └── package.json
│
└── README.md

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

cd backend
npm install
npm run dev

Backend runs on:
http://localhost:8080

---

### 🔧 Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

---

## 🔑 API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Sweets
- GET /api/sweets
- GET /api/sweets/search
- POST /api/sweets/:id/purchase
- POST /api/sweets/:id/restock (ADMIN only)

---

## 🧪 Testing

Backend tests are written using Jest.

Run tests:

cd backend
npm test

All core APIs (authentication and sweets management) are covered by tests.

---

## 🧠 Key Learnings

- Implemented JWT authentication and role-based authorization
- Built protected routes using React Router
- Managed authentication state using browser storage
- Designed clean and modular REST APIs
- Used Prisma ORM for database modeling and migrations
- Debugged real-world issues such as:
  - CORS errors
  - Authentication persistence
  - Route protection logic
- Learned the importance of stabilizing functionality before UI enhancements

---

## 📌 Current Status

- Backend APIs complete and tested
- Frontend functional with React
- Login, logout, and protected routes working
- Sweet purchase and restock features working
- Search functionality implemented
- UI intentionally kept simple and stable

---

## 🤖 My AI Usage

### AI Tools Used
- ChatGPT

### How I Used AI
- Used ChatGPT to:
  - Understand backend architecture and API design
  - Debug authentication and JWT-related issues
  - Fix React Router and login persistence problems
  - Generate and refine Jest test cases
  - Improve code structure and readability
  - Draft and organize project documentation (README)

### Reflection on AI Usage
AI significantly improved my development workflow by helping me debug issues faster, understand best practices in full-stack development, and structure the project correctly.
AI was used as a learning and assistance tool, not as a replacement for understanding or implementation.

---

## 🧑‍💻 Author

Keshav

---
