const Product = require('../models/Product');
const mongoose = require('mongoose');

//Here are the products controllers

exports.products_get_all = async (req, res, next) => {
  try {
    const product = await Product.find().select('name price _id productImage');
    const response = {
      count: product.length,
      products: product.map((prod) => {
        return {
          name: prod.name,
          price: prod.price,
          productImage: prod.productImage,
          _id: prod._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + prod._id,
          },
        };
      }),
    };
    if (product.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({
        message: 'No products found',
      });
    }
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({
        message: 'ERROR',
      });
    };
  }
};

exports.products_create_product = async (req, res, next) => {
  try {
    console.log(req.file);
    const product = await new Product({
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path,
    });
    await product.save();
    res.status(201).json({
      message: 'Created Product Succesfully',
      createdProduct: {
        name: product.name,
        price: product.price,
        productImage: product.productImage,
        id: product._id,
        request: {
          type: 'POST',
          url: 'http://localhost:3000/products/' + product._id,
        },
      },
    });
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({
        message: 'ERROR',
      });
    };
  }
};

exports.products_get_product = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id).select(
      'name price _id productImage'
    );
    res.status(200).json({
      product: product,
      request: {
        type: 'GET',
        description: 'GET_ALL_PRODUCTS',
        url: 'http:/localhost/products',
      },
    });
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({ error: err });
    };
  }
};

exports.products_update_product = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const product = await Product.update({ _id: id }, { $set: updateOps });
    res.status(200).json({
      message: 'Product Updated',
      product: product,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/products/' + id,
      },
    });
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({ error: err });
    };
  }
};

exports.products_delete_product = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.remove({ _id: id });
    res.status(200).json({
      message: 'Product deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/products/',
        body: { name: 'String', price: 'Number' },
      },
    });
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({ error: err });
    };
  }
};
