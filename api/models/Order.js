const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, default: 1 },
});

module.exports = model('Order', orderSchema);
