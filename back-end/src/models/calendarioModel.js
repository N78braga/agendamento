const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CalendarioHoraModel = require('./calendarioHoraModel');

const calendarioModel = sequelize.define('tbl_calendario', {
    id_calendario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    ano: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'tbl_calendario',
    timestamps: false
});

module.exports = calendarioModel;
