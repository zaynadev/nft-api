const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
dotenv.config();

const PORT = process.env.PORT | 3005;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(`${DB_URL}/${DB_NAME}`).then(() => {
  console.log("DB connected successfully");
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
