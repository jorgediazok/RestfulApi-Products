const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Handling GET Request to /products',
  });
});

router.post('/', (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
  };
  res.status(201).json({
    message: 'Handling POST Request to /products',
    createdProduct: product,
  });
});

router.get('/:productId', (req, res) => {
  const id = req.params.productId;
  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special id',
      id: id,
    });
  } else {
    res.status(200).json({
      message: 'You passed an ID',
    });
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
