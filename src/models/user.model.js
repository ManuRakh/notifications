const { DataTypes } = require("sequelize");
const sequelize = require("../sequilize.db");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(128),
    allowNull: false,
  }
}, {
  timestamps: true,
  tableName: 'users'
});

module.exports = User;