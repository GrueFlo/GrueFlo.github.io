const express = require("express");
const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ...rest of your server code


// Endpoint to receive the JSON data
app.post('/summary', (req, res) => {
  const summaryData = req.body;

  // Access the summary value
  const summary = summaryData.summary;

  // Handle the summary value as needed
  // You can perform any desired operations or store the data in a database

  // Send a response
  res.sendStatus(200); // Sending a success status code (200) if the request was processed successfully
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
