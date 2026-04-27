import LostItem from "../models/LostItem.js";

//  ADD ITEM
export const addLostItem = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title required" });
    }

    const item = await LostItem.create({
      ...req.body,
      image: req.file?.filename,
      user: req.user._id,
      status: "lost", //  ensure default
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  GET ALL ITEMS
export const getLostItems = async (req, res) => {
  try {
    const items = await LostItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  MARK AS FOUND (ONLY OWNER)
export const markFound = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    //  OWNER CHECK
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only owner can update" });
    }

    //  ALREADY FOUND CHECK
    if (item.status === "found") {
      return res.status(400).json({ message: "Already marked as found" });
    }

    item.status = "found";
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  DELETE ITEM (ONLY OWNER)
export const deleteLostItem = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await item.deleteOne();

    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};