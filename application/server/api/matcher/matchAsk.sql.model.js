module.exports = function(sequelize, DataTypes) {
  return sequelize.define("matchAsk", {
    matchedBuy: DataTypes.INTEGER,
    matchedAsk: { type: DataTypes.INTEGER, primaryKey: true },
    date: DataTypes.DATE,
    price: DataTypes.INTEGER,
    stock: DataTypes.STRING,
    buyer: DataTypes.STRING,
    seller: DataTypes.STRING
  });
}