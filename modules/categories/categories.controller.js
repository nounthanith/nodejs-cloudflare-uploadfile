const CategoriesModel = require("./categories.model");

exports.createCategory = async (req, res) => {
  const doc = await CategoriesModel.create(req.body);
  res.status(201).send({
    message: "Category created successfully",
    data: doc,
  });
};

exports.getAllCategories = async (req, res) => {
  const search = req.query.search || null;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let queryObject = {};

  if (search) {
    queryObject = { name: { $regex: search, $options: "i" } };
  }

  const docs = await CategoriesModel.find(queryObject)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  const totalDocs = await CategoriesModel.countDocuments(queryObject);
  const totalPages = Math.ceil(totalDocs / limit);
  res.status(200).send({
    message: "Categories fetched successfully",
    totalPages,
    totalDocs,
    data: docs,
  });
};

exports.getOneCategory = async (req, res) => {
  const id = req.params.id;
  const doc = await CategoriesModel.findById(id);

  if (!doc) return res.status(404).send({ message: "Category not found" });

  res.status(200).send({
    message: "Category fetched successfully",
    data: doc,
  });
};

exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  const doc = await CategoriesModel.findByIdAndUpdate(id, req.body);

  if (!doc) return res.status(404).send({ message: "Category not found" });

  res.status(200).send({
    message: "Category updated successfully",
  });
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  const doc = await CategoriesModel.findByIdAndDelete(id);

  if (!doc) return res.status(404).send({ message: "Category not found" });

  res.status(200).send({
    message: "Category deleted successfully",
  });
};
