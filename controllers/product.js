const Product = require("../models/product");
const fs = require("fs");
const formidable = require("formidable");
const _ = require("lodash");



exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "product is not  be found ",
      });
    }
    req.product = product;
    next();
  });
}

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "could not create the product in the database ",
      });
    }

   
    const { name, description, price, stock } = fields;

    if (!name || !description  || !price || !stock) {
      return res.status(400).json({
        error: "all necessary details for the product is not available",
      });
    }

    let product = new Product(fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "photo size is must be less than 3MB",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    product.save((err, savedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "product could not be created in the database ",
        });
      }

      res.json(savedProduct);
    });
  });
};
 


exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : _id;
  Product.find()
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "cannot retrive the products",
        });
      }
      res.json(products);
    });
};



