const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const product = await Product.find();
    if (product.length > 0) {
      res.status(200).json(product);
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

router.patch('/:productId', async (req, res) => {
  try {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const product = await Product.update({ _id: id }, { $set: updateOps });
    res.status(200).json(product);
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({ error: err });
    };
  }
});

router.delete('/:productId', async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.remove({ _id: id });
    res.status(200).json(product);
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({ error: err });
    };
  }
});

module.exports = router;
