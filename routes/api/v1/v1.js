const express = require('express');
const router = express.Router();
const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoutes = require('./expedientes/expedientes');

//Rutas
router.use('/pacientes', pacientesRoutes);
router.use('/expedientes', expedientesRoutes);

module.exports = router;