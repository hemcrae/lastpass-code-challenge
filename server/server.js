const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

const users = [
  {
    username: "username",
    password: "password",
  },
];

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/login", (req, res) => {
  res.status(200).send();
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
