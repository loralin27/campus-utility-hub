import Resource from "../models/Resource.js";

export const uploadResource = async (req, res) => {
  const resource = await Resource.create({
    title: req.body.title,
    description: req.body.description,
    file: req.file.filename,
    uploadedBy: req.user,
  });

  res.json(resource);
};

export const getResources = async (req, res) => {
  const data = await Resource.find().populate("uploadedBy");
  res.json(data);
};