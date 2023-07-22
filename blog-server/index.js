require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const postsRoute = require('./posts');
const cors = require('cors');

const app = express();
// Enable CORS
app.use(cors());

// Set up MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Register API routes
app.use('/api', postsRoute);

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
