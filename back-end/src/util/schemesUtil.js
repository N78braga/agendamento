
const sequelize = require("../config/database");
const CalendarioHoraModel = require("../models/calendarioHoraModel");
const calendarioModel = require("../models/calendarioModel");
const HoraModel = require("../models/horaModel");
const agenciaModel = require("../models/agenciaModel");
const slotsModel = require("../models/slotsModel");
const moment = require('moment-timezone')

module.exports = {
    generateSchedules(startHour, endHour, interval) {
        const schedules = [];
        let currentTime = startHour;
        while(currentTime < endHour) {
            for(let i = 0; i < 1; i++) {
                if(currentTime >= endHour) break;
                schedules.push(currentTime);
                currentTime = module.exports.addMinute(currentTime, interval);
            }
        }

        return schedules;
    },

    addMinute(time, minutes) {
        const [hour, minute] = time.split(':').map(Number);
        const date = new Date(0, 0, 0, hour, minute + minutes);
        const newHour = String(date.getHours()).padStart(2, '0');
        const newMinute = String(date.getMinutes()).padStart(2, '0');
        return `${newHour}:${newMinute}`;
    },

    isWeekend(date) {
        const correctDay = module.exports.formatToBrasiliaTime(date);
        const day = correctDay.getDay();
        return day === 6 || day === 0;
    },

    async insertSchedules(schedules, date, year, slots, id_agencia, tipo) {
        await sequelize.sync();

        const findCalendar = await calendarioModel.findOne({ where: { data: date } });

        let calendario;
        if (!findCalendar) {
            calendario = await calendarioModel.create({
                data: date,
                ano: String(year)
            });
        } else {
            calendario = findCalendar;
        }

        const horaPromise = schedules.map(time => {
            return HoraModel.findOrCreate({ where: { hora: time } });
        });

        const horarios = await Promise.all(horaPromise);

        const calendarioHoraPromise = horarios.map(async ([horario]) => {
            return CalendarioHoraModel.create({
                id_calendario: calendario.id_calendario,
                id_horario: horario.id_horario
            });
        });

        const calendarioHoras = await Promise.all(calendarioHoraPromise);

        const agenciasAtivas = await agenciaModel.findAll({ where: { id_agencia: id_agencia, status_ag: 'ATIVO' } })

        const vagasPromise = calendarioHoras.flatMap(calendarioHora => {
            return agenciasAtivas.map(agencia => {
                return slotsModel.create({
                    qtd_vagas: slots,
                    id_agencia: agencia.id_agencia,
                    id_calendario_horas: calendarioHora.id_calendario_hora,
                    tipo: tipo,
                    vagas_ocupadas: 0
                });
            });
        });

        await Promise.all(vagasPromise);
    },

    async insertSchedulesForDateRange(schedules, startDate, endDate, slots, id_agencia, tipo) {
        const date = module.exports.formatToBrasiliaTime(startDate);
        const end = module.exports.formatToBrasiliaTime(endDate);

        while (date <= end) {
            if (!module.exports.isWeekend(date)) {
                const year = date.getFullYear();
                const formattedDate = date.toISOString().split('T')[0];
                await module.exports.insertSchedules(schedules, formattedDate, year, slots, id_agencia, tipo);
            }
            date.setDate(date.getDate() + 1);
        }
    },
    
    formatToBrasiliaTime(date) {
        return moment(date).tz('America/Sao_Paulo').toDate()
    }
}