const express = require("express");
const bodyParser = require("body-parser");
let stressLevel = {};

const app = express();
app.use(bodyParser.json());
app.use(express.static("Flash-Log/"));
app.use(express.static("Group-Log/"));

app.post("/summary", (req, res) => {
  const jsonData = req.body;
  console.log(jsonData); // Do whatever you want with the received JSON data
  stressLevel.A = jsonData;

  // Send response if needed
  res.sendStatus(200);
});

app.get("/summary", (req, res) => {
  res.json(stressLevel);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
