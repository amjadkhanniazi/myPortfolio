import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import swaggerSpec from './config/swagger.js';
import aboutRoutes from './routes/aboutRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import siteSettingsRoutes from './routes/siteSettingsRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

dotenv.config();

const app = express();

/* -------------------- RATE LIMIT (SERVERLESS SAFE) -------------------- */
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

// Global middlewares
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(helmet({
  contentSecurityPolicy: false, // Disable for Swagger
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalLimiter);

// ✅ Swagger Documentation Routes (Vercel-compatible)
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/api-docs', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Portfolio API Documentation</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
      <style>
        .swagger-ui .topbar { display: none; }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
      <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
      <script>
        window.onload = function() {
          window.ui = SwaggerUIBundle({
            url: '/api-docs.json',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            plugins: [
              SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout",
            persistAuthorization: true
          });
        };
      </script>
    </body>
    </html>
  `);
});

// 🔒 Ensure DB connection (Vercel-safe)
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
app.use('/api/about', aboutRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/skill', skillRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

export default app;