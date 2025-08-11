const ProductsModel = require("./products.model");

exports.createProduct = async (req, res) => {
  const doc = await ProductsModel.create(req.body);
  res.status(201).send({
    message: "Product created successfully",
    data: doc,
  });
};

exports.getAllProducts = async (req, res) => {
  const search = req.query.search || null;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const categoryId = req.query.categoryId || null;
  const skip = (page - 1) * limit;

  let queryObject = {};

  if (search) queryObject = { name: { $regex: search, $options: "i" } };

  if (categoryId) queryObject.category = categoryId;

  const docs = await ProductsModel.find(queryObject)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "category",
      select: "name",
    });
  const totalDocs = await ProductsModel.countDocuments(queryObject);
  const totalPages = Math.ceil(totalDocs / limit);
  res.status(200).send({
    message: "Products fetched successfully",
    totalPages,
    totalDocs,
    data: docs,
  });
};

exports.getOneProduct = async (req, res) => {
  const id = req.params.id;
  const doc = await ProductsModel.findById(id);

  if (!doc) return res.status(404).send({ message: "Product not found" });

  res.status(200).send({
    message: "Product fetched successfully",
    data: doc,
  });
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const doc = await ProductsModel.findByIdAndUpdate(id, req.body);

  if (!doc) return res.status(404).send({ message: "Product not found" });

  res.status(200).send({
    message: "Product updated successfully",
    
  });
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  const doc = await ProductsModel.findByIdAndDelete(id);

  if (!doc) return res.status(404).send({ message: "Product not found" });

  res.status(200).send({
    message: "Product deleted successfully",
    
  });
};

// exports.filterByCategory = async (req, res) => {
//   const categoryId = req.params.categoryId;
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const skip = (page - 1) * limit;
//   const docs = await ProductsModel.find({ category: categoryId })
//     .skip(skip)
//     .limit(limit)
//     .sort({ _id: -1 });
  
//   res.status(200).send({
//     message: "Products fetched successfully",
//     data: docs,
//   });
// };
