const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const calendarioModel = require('./calendarioModel');
const horaModel = require("./horaModel");

const CalendarioHoraModel = sequelize.define('tbl_calendario_hora', {
    id_calendario_hora: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_calendario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tbl_calendario',
            key: 'id_calendario'
        }
    },
    id_horario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tbl_horario',
            key: 'id_horario'
        }
    }
}, {
    sequelize,
    tableName: 'tbl_calendario_hora',
    timestamps: false
})

module.exports = CalendarioHoraModel;