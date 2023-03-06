const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();

const port = process.env.PORT | 3005;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
