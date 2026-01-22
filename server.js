import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// 🔹 LOCAL DEVELOPMENT ONLY
connectDB()
  .then(() => {
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`🚀 Local server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });

/*
=================================================
⚠️ IMPORTANT
- This file is NOT used by Vercel
- Keep app.listen ONLY here
=================================================
*/
