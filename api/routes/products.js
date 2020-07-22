const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Handling GET Request to /products',
  });
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
    let response = await Product.findById({});
    res.status(200).json({ response });
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
