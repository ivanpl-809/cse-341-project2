require('dotenv').config(); // This loads the variables from the .env file

const express = require('express');
const mongoose = require('mongoose');

// Access the MongoDB URI from the environment variable
const mongoURI = process.env.MONGODB_URL;

if (!mongoURI) {
  console.log('Error: MONGODB_URL is not defined in the .env file');
  process.exit(1); // Exit the application if the environment variable is missing
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(`Failed to connect to MongoDB: ${err.message}`));

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
