const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Order = require('../models/Order');
const Product = require('../models/Product');

//Here are the orders controllers

exports.orders_get_all = async (req, res, next) => {
  try {
    const order = await Order.find().select('product quantity _id');
    res.status(200).json({
      count: order.length,
      orders: order.map((ord) => {
        return {
          _id: ord._id,
          product: ord.product,
          quantity: ord.quantity,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/' + ord._id,
          },
        };
      }),
    });
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    };
  }
};

exports.orders_create_order = async (req, res, next) => {
  try {
    const product = Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    const order = await new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId,
    });
    await order.save();
    res.status(201).json({
      message: 'Order stored',
      createdOrder: {
        _id: order.id,
        product: order.product,
        quantity: order.quantity,
      },
      request: {
        type: 'GET',
        url: 'http://localhost:3000/orders/' + order._id,
      },
    });
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    };
  }
};

exports.orders_get_order = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }
    res.status(200).json({
      order: order,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/orders',
      },
    });
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    };
  }
};

exports.orders_delete_order = async (req, res, next) => {
  try {
    await Order.remove({ _id: req.params.orderId });
    res.status(200).json({
      message: 'Order deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/orders',
        body: { productID: 'ID', quantity: 'Number' },
      },
    });
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    };
  }
};
