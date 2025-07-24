import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import authRouter from './routes/authRoute.js';
import apiRouter from './routes/apiRoute.js';
import verifyAccessToken from './middleware/authentication.js';
import cookieParser from 'cookie-parser';

const app = express();

// Connect DB
await connectDB();
  
// Middleware
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json());
app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
}));

// Routes
app.use('/api/auth', authRouter);
// Protected routes
app.use('/api',verifyAccessToken, apiRouter);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// frontend build files
app.use(express.static('../my-app/build'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong'
  });
});

// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} does not exist`
  });
});

// Start
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
