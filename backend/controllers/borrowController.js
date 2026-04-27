import BorrowItem from "../models/BorrowItem.js";

//  ADD ITEM
export const addItem = async (req, res) => {
  const { itemName } = req.body;

  if (!itemName || itemName.trim() === "") {
    return res.status(400).json({ message: "Item name required" });
  }

  const item = await BorrowItem.create({
    itemName,
    owner: req.user._id,
    status: "available", //  ensure default
  });

  res.json(item);
};

//  GET ITEMS
export const getItems = async (req, res) => {
  const items = await BorrowItem.find();
  res.json(items);
};

//  REQUEST ITEM (ONLY NON-OWNER)
export const requestItem = async (req, res) => {
  const item = await BorrowItem.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  //  OWNER CANNOT REQUEST
  if (item.owner.toString() === req.user._id.toString()) {
    return res.status(400).json({ message: "You cannot request your own item" });
  }

  //  IF ALREADY REQUESTED OR BORROWED
  if (item.status !== "available") {
    return res.status(400).json({ message: "Item not available" });
  }

  item.borrower = req.user._id;
  item.status = "requested";

  await item.save();

  res.json(item);
};

//  APPROVE ITEM (ONLY OWNER)
export const approveItem = async (req, res) => {
  const item = await BorrowItem.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  //  ONLY OWNER CAN APPROVE
  if (item.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not owner" });
  }

  //  MUST BE REQUESTED FIRST
  if (item.status !== "requested") {
    return res.status(400).json({ message: "No request to approve" });
  }

  item.status = "borrowed";

  await item.save();

  res.json(item);
};