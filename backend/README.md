# 🍬 Sweet Shop Management System (Backend)

A complete **Sweet Shop Management System backend** built using **Node.js, Express, Prisma ORM, SQLite, JWT authentication, and Test-Driven Development (TDD)**.

This project supports authentication, role-based authorization, inventory management, search, purchase, and admin-only restocking.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration
* User Login with JWT
* Role-based access control (USER / ADMIN)

### 🍭 Sweet Management

* Add sweets (protected)
* View all sweets
* Search sweets by:

  * Name
  * Category
  * Price range
* Purchase sweets (decrease quantity)
* Restock sweets (ADMIN only)

### 🧪 Testing

* Test-Driven Development (TDD)
* Jest + Supertest
* Auth and Sweet APIs tested

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **Prisma ORM**
* **SQLite**
* **JWT (jsonwebtoken)**
* **bcryptjs**
* **Jest & Supertest**

---

## 📁 Project Structure

```
backend/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   └── tests/
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone <repo-url>
cd sweet-shop-management/backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create `.env` file:

```env
JWT_SECRET=supersecretkey
```

---

## 🗄️ Database Setup (Prisma + SQLite)

### Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id       String @id @default(uuid())
  name     String
  email    String @unique
  password String
  role     String @default("USER")
}

model Sweet {
  id       String @id @default(uuid())
  name     String
  category String
  price    Float
  quantity Int
}
```

### Run Migration

```bash
npx prisma migrate dev --name init
```

---

## ▶️ Run Server

```bash
npm run dev
```

Server will start on:

```
http://localhost:8080
```

---

## 🔑 API Endpoints

### Auth APIs

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | `/api/auth/register` | Register user   |
| POST   | `/api/auth/login`    | Login & get JWT |

---

### Sweet APIs (Protected)

| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| POST   | `/api/sweets`              | Add sweet             |
| GET    | `/api/sweets`              | Get all sweets        |
| GET    | `/api/sweets/search`       | Search sweets         |
| POST   | `/api/sweets/:id/purchase` | Purchase sweet        |
| POST   | `/api/sweets/:id/restock`  | Restock sweet (ADMIN) |

---

## 🧪 Testing

Run all tests:

```bash
npm test
```

Tests include:

* User registration
* User login
* JWT validation
* Sweet creation
* Sweet retrieval

---

## 👑 Make User ADMIN (Development)

```bash
npx prisma studio
```

Update user role:

```
role = ADMIN
```

Login again to get new admin token.

---

## 🔐 Sample Authorization Header

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 🧠 Interview Summary

> “I built a Sweet Shop Management System backend using Node.js, Express, Prisma ORM, and SQLite. The system includes JWT-based authentication, role-based authorization, inventory management, search, purchase, and admin-only restocking, developed using Test-Driven Development.”

---

## 📌 Future Enhancements

* Frontend using React
* PostgreSQL migration
* Order history
* Payment integration
* Deployment (Render / Railway)

---

## 👨‍💻 Author

**Keshav**
Backend Developer | Node.js | Express | Prisma

---

✅ **Project Complete & Production-Ready (Backend)**
