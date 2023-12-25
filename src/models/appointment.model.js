const { DataTypes } = require("sequelize");
const sequelize = require("../sequilize.db");
const User = require("./user.model.js");
const Doctor = require ("./doctor.model.js");

const Appointment = sequelize.define("appointments", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  slot: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  doctor_id: {
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  tableName: 'appointments'
});

Appointment.belongsTo(User, {
  foreignKey: "user_id",
  allowNull: false
});
User.hasMany(Appointment, {
  foreignKey: "user_id"
});

Appointment.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  allowNull: false
});
Doctor.hasMany(Appointment, {
  foreignKey: "doctor_id"
});

module.exports = Appointment;
