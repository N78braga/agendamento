const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const HoraModel = require('../models/horaModel');
const calendarioModel = require('../models/calendarioModel');
const CalendarioHoraModel = require('../models/calendarioHoraModel')
const AgenciaModel = require('../models/agenciaModel');

const connection = new Sequelize(dbConfig);

HoraModel.init(connection);
calendarioModel.init(connection);
CalendarioHoraModel.init(connection);
AgenciaModel.init(connection);

CalendarioHoraModel.associate(connection.models)

AgenciaModel.init(connection);

module.exports = connection;