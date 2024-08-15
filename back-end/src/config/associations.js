const Agencia = require("../models/agenciaModel");
const CalendarioHoraModel = require("../models/calendarioHoraModel");
const calendarioModel = require("../models/calendarioModel");
const horaModel = require("../models/horaModel");
const slotsModel = require("../models/slotsModel");

calendarioModel.hasMany(CalendarioHoraModel, {
    foreignKey: 'id_calendario',
    as: 'calendarioHoras'  // Alias único
});

horaModel.hasMany(CalendarioHoraModel, {
    foreignKey: 'id_horario',
    as: 'horarios'  // Alias único
});

CalendarioHoraModel.belongsTo(calendarioModel, {
    foreignKey: 'id_calendario',
    as: 'calendario'
});

CalendarioHoraModel.belongsTo(horaModel, {
    foreignKey: 'id_horario',
    as: 'horario'
});

slotsModel.belongsTo(CalendarioHoraModel, {
    foreignKey: 'id_calendario_horas'
})

slotsModel.belongsTo(Agencia, {
    foreignKey: 'id_agencia',
})

Agencia.hasMany(slotsModel, {
    foreignKey: 'id_agencia'
});

CalendarioHoraModel.hasMany(slotsModel, {
    foreignKey: 'id_calendario_horas'
});