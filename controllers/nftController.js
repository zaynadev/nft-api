const { NFT } = require("./../models");

const top5Nfts = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = "-ratingAverage,price";
  req.query.fields = "name,price,ratingAverage";
  next();
};

const getAllNfts = async (req, res) => {
  try {
    //PAGINATION
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 3;
    const skip = (page - 1) * limit;

    let query = NFT.find().skip(skip).limit(limit);

    //SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //FIELDS LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const nfts = await query;

    res.json({ status: "success", data: nfts });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", message: "error occured, please try again!" });
  }
};
const getOneNfts = async (req, res) => {
  try {
    const { id } = req.params;
    const nft = await NFT.findById(id);
    res.json({ status: "success", data: nft });
  } catch (error) {
    res.status(404).json({ status: "failed", message: "Not found!" });
  }
};

const createNfts = async (req, res) => {
  try {
    const newNFT = await NFT.create(req.body);
    res.status(201).json({ status: "success", data: newNFT });
  } catch (error) {
    console.log({ error });
    res
      .status(400)
      .json({ status: "failed", message: "error occured,  please try again!" });
  }
};

const updateNft = async (req, res) => {
  try {
    const { id } = req.params;
    const updateNFT = await NFT.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ status: "success", data: updateNFT });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", message: "error occured,  please try again!" });
  }
};
const deleteNft = async (req, res) => {
  try {
    const { id } = req.params;
    await NFT.findByIdAndDelete(id);
    res.status(201).json({ status: "success", data: "done" });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", message: "error occured,  please try again!" });
  }
};

module.exports = {
  getAllNfts,
  createNfts,
  getOneNfts,
  updateNft,
  deleteNft,
  top5Nfts,
};
