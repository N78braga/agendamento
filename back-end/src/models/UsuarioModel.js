const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class UsuarioSistema extends Model {}

UsuarioSistema.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_agencias: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tbl_agencia',
            key: 'id_agencia'
        }
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nivel: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'tbl_usuario',
    timestamps: false,
});

module.exports = UsuarioSistema;