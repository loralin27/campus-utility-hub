import BorrowItem from "../models/BorrowItem.js";

export const addItem = async (req, res) => {
  const { itemName } = req.body;

  if (!itemName || itemName.trim() === "") {
    return res.status(400).json({ message: "Item name required" });
  }

  const item = await BorrowItem.create({
    itemName,
    owner: req.user._id,
  });

  res.json(item);
};

export const getItems = async (req, res) => {
  res.json(await BorrowItem.find());
};

export const requestItem = async (req, res) => {
  const item = await BorrowItem.findById(req.params.id);

  item.borrower = req.user._id;
  item.status = "requested";

  await item.save();
  res.json(item);
};

export const approveItem = async (req, res) => {
  const item = await BorrowItem.findById(req.params.id);

  if (item.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not owner" });
  }

  item.status = "borrowed";
  await item.save();

  res.json(item);
};