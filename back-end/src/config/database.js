const { Sequelize } = require('sequelize');

require('dotenv').config()

// const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//   host: process.env.DB_URL,
//   dialect: 'mysql',
//   define: {
//     timestamps: true,
//   }
// });
const sequelize = new Sequelize('db_agendamento_sas_novo', 'localhost', 'Braga@Silna1', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  dialectOptions: {
    connectTimeout: 60000, // timeout de 60 segundos
  },
 define: {
     timestamps: true,
   }
});


module.exports = sequelize;

