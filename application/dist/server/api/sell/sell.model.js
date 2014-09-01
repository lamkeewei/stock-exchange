'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SellSchema = new Schema({
  userId: String,
  stock: String,
  price: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sell', SellSchema);