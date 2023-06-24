const express = require("express");
const bodyParser = require("body-parser");

let crewPackage = {
  A: null,
  B: null,
  C: null,
  D: null,
};

const app = express();
app.use(bodyParser.json());
app.use(express.static("Flash-Log/"));
app.use(express.static("Group-Log/"));

app.post("/FlashLogA", (req, res) => {
  const jsonData = req.body;
  crewPackage.A = jsonData;

  console.log(jsonData); // Do whatever you want with the received JSON data

  // Send response if needed
  res.sendStatus(200);
});

app.post("/FlashLogB", (req, res) => {
  const jsonData = req.body;
  crewPackage.B = jsonData;

  console.log(jsonData); // Do whatever you want with the received JSON data

  // Send response if needed
  res.sendStatus(200);
});

app.post("/FlashLogC", (req, res) => {
  const jsonData = req.body;
  crewPackage.C = jsonData;

  console.log(jsonData); // Do whatever you want with the received JSON data

  // Send response if needed
  res.sendStatus(200);
});

app.post("/FlashLogD", (req, res) => {
  const jsonData = req.body;
  crewPackage.D = jsonData;

  console.log(jsonData); // Do whatever you want with the received JSON data

  // Send response if needed
  res.sendStatus(200);
});

app.get("/crewPackage", (req, res) => {
  res.json(crewPackage);
});

// Send crewPackage data to the new script
app.post("/sendData", (req, res) => {
  // Assuming you have a separate script or endpoint where you want to send the data
  // You can access the crewPackage data here and send it to the new script or platform

  // Example code for sending data to a new script using fetch():
  fetch("../crewPackage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(crewPackage),
  })
    .then((response) => {
      // Handle the response if needed
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
    });

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
