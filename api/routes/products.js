const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Handling GET Request to /products',
  });
});

router.post('/', (req, res) => {
  res.status(200).json({
    message: 'Handling POST Request to /products',
  });
});

module.exports = router;
