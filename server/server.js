const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/login", (req, res) => {
  res.status(200).send();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
