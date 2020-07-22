const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({
        message: 'ERROR',
      });
    };
  }
});

router.post('/', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
    });
    await product.save();
    res.status(201).json({
      message: 'Handling POST requests to/products',
      createdProduct: product,
    });
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({
        message: 'ERROR',
      });
    };
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);
    console.log('from the database', product);
    res.status(200).json(product);
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({ error: err });
    };
  }
});

router.patch('/:productId', (req, res) => {
  res.status(200).json({
    message: 'UPDATED PRODUCT',
  });
});

router.delete('/:productId', (req, res) => {
  res.status(200).json({
    message: 'DELETED PRODUCT',
  });
});

module.exports = router;
