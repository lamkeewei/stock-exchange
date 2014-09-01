'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BuySchema = new Schema({
  userId: String,
  stock: String,
  price: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Buy', BuySchema);