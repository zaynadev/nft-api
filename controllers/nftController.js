const fs = require("fs");

const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/json/nft-simple.json`)
);

const getAllNfts = (req, res) => {
  res.json({ data: nfts });
};

module.exports = { getAllNfts };
