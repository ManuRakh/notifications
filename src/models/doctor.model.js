const { DataTypes } = require("sequelize");
const sequelize = require("../sequilize.db");

const Doctor = sequelize.define("doctors", {
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
  spec: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  slots: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  timestamps: true,
  tableName: 'doctors'
});

module.exports = Doctor;
