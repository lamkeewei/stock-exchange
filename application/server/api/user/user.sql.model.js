module.exports = function(sequelize, DataTypes) {
  return sequelize.define("user", {
    userId: { type: DataTypes.STRING(255), primaryKey: true},
    creditUsed: DataTypes.INTEGER,
    version: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
}