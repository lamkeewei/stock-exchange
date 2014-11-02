module.exports = function(sequelize, DataTypes) {
  return sequelize.define("bid", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    stock: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    matchedAsk: DataTypes.INTEGER
  });
}