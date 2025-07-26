// server.js
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import verifyAccessToken from './middleware/authentication.js';

const app = express();

// __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
await connectDB();

// Global Middlewares
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json());

// Rate Limiter
app.use(rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // limit each IP to 1000 requests per windowMs
}));

// API Routes
try {
  const { default: authRouter } = await import('./routes/authRoute.js');
  app.use('/api/auth', authRouter);
} catch (err) {
  console.error("Error in authRoute.js", err);
}
try {
  const { default: videoRouter } = await import('./routes/videoRoute.js');
  app.use('/api/videos', videoRouter);
} catch (err) {
  console.error("Error in videoRoute.js", err);
}
try{
  const { default: reportScamRouter } = await import('./routes/reportScamRoute.js');
  app.use('/api/report-scam', reportScamRouter);
} catch (err) {
  console.error("Error in reportScamRoute.js", err);
}
try {
  const { default: apiRouter } = await import('./routes/apiRoute.js');
  app.use('/api', verifyAccessToken, apiRouter);
} catch (err) {
  console.error("Error in apiRoute.js", err);
}

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Serve uploaded files
app.use('/files', express.static(path.join(__dirname, 'files')));

// ✅ Serve frontend build
app.use(express.static(path.join(__dirname, '../my-app/build')));

// ✅ Catch-all for React Router (non-API, non-files)
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/files')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../my-app/build', 'index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ API is available at http://localhost:${PORT}/api`);
});
