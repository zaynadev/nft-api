const express = require("express");

const app = express();
const port = 3005;

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
