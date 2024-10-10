
// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import apiRouter from './router/index.js';








// dotenv.config(); // Load environment variables from .env file

// const app = express();
// app.use(express.json());
// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));
// const mongoURI = process.env.MONGO_URI; // Get the MongoDB URI from environment variables
// const port = process.env.PORT || 4300; // Set port from environment variable or default to 4500

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// // // API routes
// app.use('/api',apiRouter);
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import apiRouter from './router/index.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const mongoURI = process.env.MONGO_URI; // Get the MongoDB URI from environment variables
const port = process.env.PORT || 4300; // Set port from environment variable or default to 4300

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API routes
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
