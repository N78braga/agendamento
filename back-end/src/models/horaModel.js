const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const horaModel = sequelize.define(
  "tbl_horario",
  {
    id_horario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tbl_horario",
    timestamps: false,
  }
);

module.exports = horaModel;
