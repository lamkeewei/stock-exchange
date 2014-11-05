module.exports = function(sequelize, DataTypes) {
  return sequelize.define("ask", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    stock: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    matchedBuy: DataTypes.INTEGER,
    version: { type: DataTypes.INTEGER, default: 0 }
  });
}