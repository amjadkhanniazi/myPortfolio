import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import path from 'path';


dotenv.config();

const app = express();

// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

/* -------------------- RATE LIMIT (SERVERLESS SAFE) -------------------- */
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,      // 1 minute
  max: 50,                
  standardHeaders: true,
  legacyHeaders: false,
});

// Global middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(globalLimiter);


// 🔑 Ensure DB connection (Vercel-safe)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

export default app;