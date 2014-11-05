module.exports = function(sequelize, DataTypes) {
  return sequelize.define("matchedLog", {    
    matchedBuy: { type: DataTypes.INTEGER, primaryKey: true },
    matchedAsk: { type: DataTypes.INTEGER, primaryKey: true },
    date: DataTypes.DATE,
    price: DataTypes.INTEGER,
    stock: DataTypes.STRING,
    buyer: DataTypes.STRING,
    seller: DataTypes.STRING,
    status: DataTypes.STRING
  });
}