'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BuySchema = new Schema({
  userId: String,
  stock: String,
  price: Number,
  date: { type: Date, default: Date.now },
  match: { type: Schema.Types.ObjectId, ref: 'Sell'}
});

module.exports = mongoose.model('Buy', BuySchema);