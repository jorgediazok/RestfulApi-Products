const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

require('./database');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

//Middlewares
app.use(morgan('dev'));
app.use('./uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//CORS
app.use(cors());

//Routes that handle requests
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

//Errors handlers

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
