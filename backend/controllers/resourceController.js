import Resource from "../models/Resource.js";

export const addResource = async (req, res) => {
  if (!req.body.title || req.body.title.trim() === "") {
    return res.status(400).json({ message: "Title required" });
  }

  const resource = await Resource.create({
    title: req.body.title,
    file: req.file.filename,
    user: req.user._id,
  });

  res.json(resource);
};

export const getResources = async (req, res) => {
  res.json(await Resource.find());
};

export const deleteResource = async (req, res) => {
  const item = await Resource.findById(req.params.id);

  if (item.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await item.deleteOne();
  res.json({ message: "Deleted" });
};