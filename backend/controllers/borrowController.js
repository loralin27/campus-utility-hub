import BorrowItem from "../models/BorrowItem.js";

export const addItem = async (req, res) => {
  const item = await BorrowItem.create({
    ...req.body,
    owner: req.user,
  });
  res.json(item);
};

export const requestItem = async (req, res) => {
  const item = await BorrowItem.findById(req.params.id);
  item.borrower = req.user;
  item.status = "requested";
  await item.save();

  res.json(item);
};