const express = require("express");
const morgan = require("morgan");
const { nftRouter, userRouter } = require("./routes");

const app = express();
app.use(express.json());
process.env.NODE_ENV === "development" && app.use(morgan("dev"));

app.use(express.static(`${__dirname}/data/img`));

const baseUrl = "/api/v1";

app.use(`${baseUrl}/nft`, nftRouter);
app.use(`${baseUrl}/user`, userRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: `Can't find ${req.originalUrl}`,
  });
});

module.exports = app;
