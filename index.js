
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './router/index.js';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded bodies
app.use(cookieParser()); // To parse cookies

// CORS setup for frontend communication
app.use(cors({
  
  origin: 'https://deals-dray-client.vercel.app/',
  credentials: true, // Allow cookies to be sent with requests
}));
//http://localhost:5174
// MongoDB connection setup
const mongoURI = process.env.MONGO_URI; // Get MongoDB URI from environment variable
const port = process.env.PORT || 4300; // Set server port, default is 4300

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Default route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API routes
app.use('/api', apiRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
