import LostItem from "../models/LostItem.js";

export const createItem = async (req, res) => {
  const item = await LostItem.create({
    ...req.body,
    image: req.file?.filename,
  });
  res.json(item);
};

export const getItems = async (req, res) => {
  const items = await LostItem.find();
  res.json(items);
};