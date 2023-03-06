const express = require("express");
const { getAllNfts } = require("../controllers/nftController");

const router = express.Router();

router.get("/", getAllNfts);
router.get("/id", (req, res) => {});
router.post("/", (req, res) => {});
router.patch("/:id", (req, res) => {});
router.delete("/id", (req, res) => {});

module.exports = router;
