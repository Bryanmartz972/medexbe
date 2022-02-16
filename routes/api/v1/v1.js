const express = require("express");
const router = express.Router();
const { verifyApiHeaderToken } = require("./headerVerifyMiddleware");
const pacientesRoutes = require("./pacientes/pacientes");
const expedientesRoutes = require("./expedientes/expedientes");

//Rutas
//Middlewares
router.use("/pacientes", verifyApiHeaderToken, pacientesRoutes);
router.use("/expedientes", verifyApiHeaderToken, expedientesRoutes);

module.exports = router;
