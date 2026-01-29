# 🏥 Portfolio Project Backend API Documentation

---

## 🚀 Features

- **User Registration** — Register with email + password (password is hashed)
- **User Login** — Verify credentials and receive JWT token
- **Get Current User** — Fetch authenticated user profile (`getMe`)
- **Profile Management** — Create, read, update, and delete user profiles with image upload support
- **Profile Image Management** — Upload, update, and delete profile images independently

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (`jsonwebtoken`)
- **Hashing:** `bcryptjs`
- **File Upload:** Multer (for profile images)

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

---

## 👤 Profile Management Endpoints

> **Note:** All profile endpoints require authentication. Include the JWT token in the Authorization header.

---

### Create Profile

**Endpoint:** `POST /api/profile`  
**Description:** Create a new user profile with optional profile image upload.  
**Authentication:** Required

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body (Form Data):**
```
full_name: "John Doe"
title: "Full Stack Developer"
tagline: "Building amazing web applications"
location: "San Francisco, CA"
phone: "+1234567890"
social_links: ["https://linkedin.com/in/amjadkhan","https://github.com/amjadkhan"]
profile_image_url: <file> (optional)
```

**Success Response (201):**
```json
{
  "status": "success",
  "data": {
    "profile": {
      "user_id": "65f1c2a8a1b2c3d4e5f6a789",
      "full_name": "John Doe",
      "title": "Full Stack Developer",
      "tagline": "Building amazing web applications",
      "location": "San Francisco, CA",
      "phone": "+1234567890",
      "profile_image_url": "/uploads/profiles/profile-1234567890.jpg",
      "social_links": ["https://linkedin.com/in/amjadkhan","https://github.com/amjadkhan"],
      "created_at": "2026-01-28T07:44:00.000Z",
      "updated_at": "2026-01-28T07:44:00.000Z"
    }
  }
}
```

**Status Codes:**
- `201` — Profile created successfully
- `500` — Server error

---

### Get Profile

**Endpoint:** `GET /api/profile`  
**Description:** Retrieve the authenticated user's profile.  
**Authentication:** Required

**Headers:**
- `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "profile": {
      "user_id": "65f1c2a8a1b2c3d4e5f6a789",
      "full_name": "John Doe",
      "title": "Full Stack Developer",
      "tagline": "Building amazing web applications",
      "location": "San Francisco, CA",
      "phone": "+1234567890",
      "profile_image_url": "/uploads/profiles/profile-1234567890.jpg",
      "social_links": ["https://linkedin.com/in/amjadkhan","https://github.com/amjadkhan"],
      "created_at": "2026-01-28T07:44:00.000Z",
      "updated_at": "2026-01-28T07:44:00.000Z"
    }
  }
}
```

**Status Codes:**
- `200` — Success
- `404` — Profile not found
- `500` — Server error

---

### Update Profile

**Endpoint:** `PUT /api/profile`  
**Description:** Update the authenticated user's profile information.  
**Authentication:** Required

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "full_name": "John Doe Updated",
  "title": "Senior Full Stack Developer",
  "tagline": "Creating innovative solutions",
  "location": "New York, NY",
  "phone": "+1987654321",
  "social_links": ["https://linkedin.com/in/amjadkhan","https://github.com/amjadkhan"]
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "profile": {
      "user_id": "65f1c2a8a1b2c3d4e5f6a789",
      "full_name": "John Doe Updated",
      "title": "Senior Full Stack Developer",
      "tagline": "Creating innovative solutions",
      "location": "New York, NY",
      "phone": "+1987654321",
      "profile_image_url": "/uploads/profiles/profile-1234567890.jpg",
      "social_links": ["https://linkedin.com/in/amjadkhan","https://github.com/amjadkhan"],
      "created_at": "2026-01-28T07:44:00.000Z",
      "updated_at": "2026-01-28T08:00:00.000Z"
    }
  }
}
```

**Status Codes:**
- `200` — Profile updated successfully
- `404` — Profile not found
- `500` — Server error

---

### Delete Profile

**Endpoint:** `DELETE /api/profile`  
**Description:** Delete the authenticated user's profile and associated profile image.  
**Authentication:** Required

**Headers:**
- `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Profile deleted successfully"
}
```

**Status Codes:**
- `200` — Profile deleted successfully
- `404` — Profile not found
- `500` — Server error

---

### Delete Profile Image

**Endpoint:** `DELETE /api/profile/delimg`  
**Description:** Delete only the profile image while keeping the profile data intact.  
**Authentication:** Required

**Headers:**
- `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Profile image deleted successfully",
  "data": {
    "profile": {
      "user_id": "65f1c2a8a1b2c3d4e5f6a789",
      "full_name": "John Doe",
      "title": "Full Stack Developer",
      "tagline": "Building amazing web applications",
      "location": "San Francisco, CA",
      "phone": "+1234567890",
      "profile_image_url": null,
      "social_links": ["https://linkedin.com/in/amjadkhan","https://github.com/amjadkhan"],
      "created_at": "2026-01-28T07:44:00.000Z",
      "updated_at": "2026-01-28T08:15:00.000Z"
    }
  }
}
```

**Status Codes:**
- `200` — Image deleted successfully
- `404` — Profile not found
- `500` — Server error

---

### Upload/Change Profile Image

**Endpoint:** `POST /api/profile/newimg`  
**Description:** Upload a new profile image or replace the existing one.  
**Authentication:** Required

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body (Form Data):**
```
profile_image_url: <file>
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Profile image uploaded successfully",
  "data": {
    "profile_image_url": "/uploads/profiles/profile-9876543210.jpg",
    "profile": {
      "user_id": "65f1c2a8a1b2c3d4e5f6a789",
      "full_name": "John Doe",
      "title": "Full Stack Developer",
      "tagline": "Building amazing web applications",
      "location": "San Francisco, CA",
      "phone": "+1234567890",
      "profile_image_url": "/uploads/profiles/profile-9876543210.jpg",
      "social_links": ["https://linkedin.com/in/amjadkhan","https://github.com/amjadkhan"],
      "created_at": "2026-01-28T07:44:00.000Z",
      "updated_at": "2026-01-28T08:30:00.000Z"
    }
  }
}
```

**Status Codes:**
- `200` — Image uploaded successfully
- `400` — No image file provided
- `404` — Profile not found (must create profile first)
- `500` — Server error

---

## 📝 Important Notes

### Profile Management
- **Profile Image Upload:** Accepts image files through multipart/form-data
- **Social Links:** Must be sent as JSON string when uploading with form-data in the create profile endpoint
- **Image Storage:** Profile images are stored in `/uploads/profiles/` directory
- **Automatic Cleanup:** Old profile images are automatically deleted when uploading new ones or deleting the profile
- **Profile Required:** You must create a profile before uploading a profile image using the `/api/profile/newimg` endpoint

### Authentication
- All profile endpoints require a valid JWT token in the Authorization header
- Tokens are obtained through the login or registration endpoints
- Each user can only access and modify their own profile data

---

## 🔒 Security Features

- Passwords are hashed using bcryptjs before storage
- JWT tokens for secure authentication
- Protected routes require valid authentication
- File upload validation for profile images
- Automatic cleanup of orphaned image files

---

## 📂 Project Structure

```
├── controllers/
│   ├── authController.js
│   └── profileController.js
├── models/
│   ├── User.js
│   └── Profile.js
├── routes/
│   ├── authRoutes.js
│   └── profileRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
└── uploads/
    └── profiles/
```

---

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---