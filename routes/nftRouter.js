const express = require("express");
const {
  getAllNfts,
  createNfts,
  getOneNfts,
  updateNft,
  deleteNft,
  top5Nfts,
} = require("../controllers/nftController");

const router = express.Router();

router.get("/", getAllNfts);
router.get("/top5", top5Nfts, getAllNfts);
router.get("/:id", getOneNfts);
router.post("/", createNfts);
router.patch("/:id", updateNft);
router.delete("/:id", deleteNft);

module.exports = router;
