module.exports = function(sequelize, DataTypes) {
  return sequelize.define("matchBuy", {
    matchedBuy: { type: DataTypes.INTEGER, primaryKey: true },
    matchedAsk: DataTypes.INTEGER,
    date: DataTypes.DATE,
    price: DataTypes.INTEGER,
    stock: DataTypes.STRING,
    buyer: DataTypes.STRING,
    seller: DataTypes.STRING
  });
}