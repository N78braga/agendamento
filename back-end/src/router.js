
const express = require('express');
const calendarController = require('./controllers/calendarController');
const agenciaController = require("./controllers/agenciaController.js");
const slotsController = require("./controllers/slotsController");
const usuarioController = require("./controllers/usuarioController.js");
const {autenticarUsuario} = require("./middlewares/authenticateUser.js");
const cidadaoController = require("./controllers/cidadaoController.js");

const router = express.Router();

router.get('/', (req, res) => res.send('<h1>Forbidden</h1>'));

router.post('/calendar/add', calendarController.addSchemes);
router.post('/calendar/addHours', calendarController.addSchemesForHour);
router.get('/calendar/get', calendarController.getSchemes);
router.get('/calendar/getOne', calendarController.getOneScheme);
router.put('/calendar/update', calendarController.updateSchemes);

router.post("/agencias/new", agenciaController.creaateNewAgencia);
router.get("/agencias/get", agenciaController.getAgencias);
router.post("/agencias/activ", agenciaController.activeAgency);
router.get("/agenciasAtivas", agenciaController.agenciaAtivas);
// router.put("/agencias", agenciaController.updateEnderecoAgencias);
// router.put("/agencias/status", agenciaController.updateStatusAgencias);

router.get("/usuarios", usuarioController.getUsuarios);
router.post("/usuarios/login", usuarioController.login);
router.get("/usuarioslevel",autenticarUsuario, usuarioController.levelUser);

router.get('/slots/get', slotsController.getSlots);
router.get('/slots/getSchedules', slotsController.getSlotsWithSchedule);


module.exports = router;
