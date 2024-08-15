const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Agencia extends Model {}

Agencia.init({
    id_agencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regional: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_ag: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'tbl_agencia',
    timestamps: false
});

module.exports = Agencia;


