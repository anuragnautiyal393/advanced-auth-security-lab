<div align="center">

# 🔐 Advanced Auth & Security Lab

### A full-stack authentication and security-focused web application built with React, Express, MongoDB and JWT.

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose">
  <img src="https://img.shields.io/badge/Nodemailer-Email-22A2F2?style=for-the-badge" alt="Nodemailer">
</p>

<p>
  <b>Authentication • Authorization • Email Verification • Password Recovery • Protected Routes</b>
</p>

</div>

---

## 📌 Overview

**Advanced Auth & Security Lab** is a full-stack authentication project designed to explore how modern web authentication systems work beyond a simple login form.

The application implements a complete authentication lifecycle including:

* User registration
* Secure password hashing
* JWT-based authentication
* Protected API routes
* Login and logout
* Email verification
* Forgot-password flow
* Password reset
* Persistent authentication state
* Profile information
* Login tracking
* Centralized error handling
* Email delivery through SMTP

The project was built as a practical learning environment for understanding authentication architecture, security concepts, frontend/backend communication, and real-world API design.

---

## ✨ Features

### 🔐 Authentication

* User registration with validation
* Secure password hashing with `bcrypt`
* JWT-based authentication
* Login and logout
* Authentication middleware
* Protected backend routes
* Persistent frontend authentication state
* Profile retrieval for authenticated users

### 📧 Email Security

* Email verification after registration
* Verification status tracking
* Forgot-password flow
* Secure password reset flow
* SMTP email delivery with Nodemailer

### 👤 User & Security Dashboard

* Profile page
* Account creation timestamp
* Email verification status
* Last login timestamp
* Security dashboard
* Authentication state management

### 🧩 Application Features

* React Router based navigation
* Protected frontend routes
* Axios API communication
* Centralized authentication context
* CORS configuration
* Cookie parsing
* Centralized Express error handling
* Custom 404 page
* Developer testing routes

---

## 🔄 Authentication Flow

```text
                    ┌─────────────────┐
                    │     Register    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Password Hashing │
                    │    bcrypt       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ MongoDB / User  │
                    │     Storage     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Email Verify    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      Login      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   JWT Issued    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Protected APIs  │
                    └─────────────────┘
```

Password recovery follows a separate flow:

```text
Forgot Password
      │
      ▼
Reset Token / Recovery Flow
      │
      ▼
Password Reset
      │
      ▼
Updated Password
```

---

## 🧰 Tech Stack

| Layer             | Technologies                    |
| ----------------- | ------------------------------- |
| Frontend          | React, React Router, Axios      |
| Backend           | Node.js, Express                |
| Database          | MongoDB, Mongoose               |
| Authentication    | JWT                             |
| Password Security | bcrypt                          |
| Email             | Nodemailer / SMTP               |
| Configuration     | dotenv                          |
| API Security      | CORS, authentication middleware |
| Development       | Vite, Nodemon                   |

---

## 📁 Project Structure

```text
advanced-auth-security-lab/
│
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │   └── user.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── utils/
│   │   └── sendEmail.js
│   │
│   ├── .env
│   └── package.json
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   │   ├── ChangePassword/
│   │   ├── ForgotPassword/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── NotFound/
│   │   ├── Profile/
│   │   ├── Register/
│   │   ├── ResetPassword/
│   │   ├── Security/
│   │   └── VerifyEmail/
│   │
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd advanced-auth-security-lab
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create:

```text
backend/.env
```

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
```

The frontend uses:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Use `.env.example` as the template and **never commit real credentials**.

### 5. Start the backend

From the `backend` directory:

```bash
node app.js
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Start the frontend

From the project root:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

## 🔌 API Reference

Base URL:

```text
http://localhost:5000/api/auth
```

### Authentication

| Method | Endpoint     | Purpose                       |
| ------ | ------------ | ----------------------------- |
| `POST` | `/register`  | Register a new user           |
| `POST` | `/login`     | Authenticate a user           |
| `POST` | `/logout`    | Log out                       |
| `GET`  | `/profile`   | Retrieve authenticated user   |
| `GET`  | `/protected` | Test protected authentication |

### Email & Password Recovery

| Method | Endpoint           | Purpose                    |
| ------ | ------------------ | -------------------------- |
| `GET`  | `/verify-email`    | Verify a user's email      |
| `POST` | `/forgot-password` | Initiate password recovery |
| `POST` | `/reset-password`  | Reset the user's password  |

### Development / Testing

| Method | Endpoint      | Purpose                         |
| ------ | ------------- | ------------------------------- |
| `GET`  | `/test-email` | Test email delivery             |
| `GET`  | `/test-error` | Test centralized error handling |

---

## 🛡️ Security Concepts Demonstrated

This project focuses on understanding the building blocks behind authentication systems.

### Password Hashing

Passwords are hashed using `bcrypt` rather than storing plaintext passwords.

```text
Plain Password
      │
      ▼
   bcrypt
      │
      ▼
Password Hash
      │
      ▼
    MongoDB
```

### JWT Authentication

After successful authentication, the backend issues a JSON Web Token that can be used to access protected resources.

```text
Client
  │
  │ Login credentials
  ▼
Backend
  │
  │ Verify credentials
  ▼
JWT
  │
  ▼
Authenticated Requests
```

### Authentication Middleware

Protected routes use middleware to verify authentication before allowing access to the requested resource.

### Environment Variables

Sensitive configuration such as:

* MongoDB credentials
* JWT secret
* Email credentials

is kept outside the source code through environment variables.

### CORS & Credentials

The backend is configured to communicate securely with the separate React frontend while handling cross-origin requests.

---

## 📧 Email System

The application uses **Nodemailer** with SMTP to handle transactional email functionality.

Current email-related flows include:

* Email verification
* Password recovery
* Password reset
* Development email testing

Credentials are supplied through environment variables rather than being committed to the repository.

---

## 🎨 Frontend Architecture

The frontend is organized around reusable React components, pages, services and authentication state.

### Pages

* `Home` — Application landing page
* `Register` — New account registration
* `Login` — User authentication
* `Profile` — Authenticated user information
* `Security` — Security-related account information
* `ChangePassword` — Password management interface
* `VerifyEmail` — Email verification flow
* `ForgotPassword` — Password recovery request
* `ResetPassword` — Password reset interface
* `NotFound` — Invalid route handling

### Authentication State

Authentication state is managed through React Context, allowing different parts of the application to access the current authentication state without manually passing it through the component tree.

Axios is used as the communication layer between the React frontend and Express API.

---

## 🧠 What I Learned

Building this project helped me understand how the individual pieces of a real authentication system fit together.

Key concepts explored:

* REST API design
* Express routing
* MongoDB data modelling
* Mongoose schemas
* Password hashing
* JWT authentication
* Authentication middleware
* Protected routes
* Email verification
* Password recovery
* SMTP email delivery
* Environment configuration
* CORS
* Frontend/backend integration
* Centralized error handling
* Authentication state management in React

The project also provided practical experience debugging issues across the frontend, backend, database and local development environment.

---

## ⚠️ Security Disclaimer

This project is primarily an **educational and portfolio project**.

Although it demonstrates several real-world authentication concepts, it should not be considered a production-ready authentication framework without additional security review, testing, monitoring and hardening.

Never commit:

* `.env` files
* Database credentials
* JWT secrets
* Email passwords
* API keys
* Other private credentials

---

## 📌 Project Status

**Status: Completed**

The current implementation covers the core authentication and account-security flows intended for this project.

Future improvements may include additional automated testing, more advanced account-management functionality and further production-level security hardening.

---

## 👨‍💻 Author

**Anurag**

BTech Computer Science Engineering student interested in:

* Full-Stack Development
* Backend Engineering
* Software Engineering
* AI/ML
* Open Source

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

**Built to understand authentication — not just copy it.**

</div>
