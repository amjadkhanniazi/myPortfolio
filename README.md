# 🏥 Portfolio Project Backend API Documentation

---

## 🚀 Features

- **User Registration** — Register with email + password (password is hashed)
- **User Login** — Verify credentials and receive JWT token
- **Get Current User** — Fetch authenticated user profile (`getMe`)

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (`jsonwebtoken`)
- **Hashing:** `bcryptjs`

---

## ▶️ Running the Project

**Production:**
```bash
npm dev
```

**Development:**
```bash
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file and set at least:

```env
JWT_SECRET=your_super_secret_key
MONGO_URL=Connection String
```

(Your database connection variables depend on your app setup, e.g. `MONGO_URL`.)

---

## 📚 API Documentation

#### Base URL
```
https://my-portfoliooooo.vercel.app/
```

#### Response Format (General)
Most responses follow this structure:

```json
{
  "status": "success",
  "message": "Some message",
  "data": {}
}
```

Errors typically look like:

```json
{
  "status": "error",
  "message": "Error details"
}
```

---

## 🔐 Authentication

#### Auth Header (Protected Routes)
For protected endpoints, send the JWT token:

**Header:**
`Authorization: Bearer <token>`

Example:
`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 🔐 Authentication Endpoints

> Note: Your controller functions are `register`, `login`, `getMe`, `logout`, `changePassword`.  
> The exact route paths depend on your router setup. Below is a **recommended/typical** mapping under `/api/auth`.

---

### Register User

**Endpoint:** `POST /api/auth/register`  
**Description:** Register a new user account and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65f1c2a8a1b2c3d4e5f6a789",
      "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Status Codes:**
- `201` — Created successfully
- `400` — User already exists with this email
- `500` — Server error

---

### Login User

**Endpoint:** `POST /api/auth/login`  
**Description:** Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65f1c2a8a1b2c3d4e5f6a789",
      "email": "user@example.com",
      "last_login": "2026-01-22T12:34:56.789Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Status Codes:**
- `200` — Login successful
- `401` — Invalid email or password
- `500` — Server error

---

### Get Current User (Me)

**Endpoint:** `GET /api/auth/me`  
**Description:** Return the currently authenticated user (requires JWT).

**Headers:**
- `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "65f1c2a8a1b2c3d4e5f6a789",
      "email": "user@example.com",
      "last_login": "2026-01-22T12:34:56.789Z"
    }
  }
}
```

**Status Codes:**
- `200` — Success
- `404` — User not found
- `500` — Server error