const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const slotsModel = sequelize.define('tbl_vagas', {
    id_vagas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    qtd_vagas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vagas_ocupadas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_agencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tbl_agencia',
            key: 'id_agencia'
        }
    },
    id_calendario_horas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tbl_calendario_hora',
            key: 'id_calendario_hora'
        }
    }
}, {
    sequelize,
    tableName: 'tbl_vagas',
    timestamps: false
});

module.exports = slotsModel;