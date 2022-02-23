const express = require("express");
const router = express.Router();
const { verifyApiHeaderToken } = require("./headerVerifyMiddleware");
const { passport, jwtMiddleWare } = require('./seguridad/jwtHelper')
const pacientesRoutes = require("./pacientes/pacientes");
const expedientesRoutes = require("./expedientes/expedientes");
const seguridadRoutes = require('./seguridad/seguridad')

router.use(passport.initialize())
//Rutas
//Public
router.use("/seguridad", seguridadRoutes);
//Middlewares
router.use("/pacientes", verifyApiHeaderToken, jwtMiddleWare, pacientesRoutes);
router.use("/expedientes", verifyApiHeaderToken, expedientesRoutes);

module.exports = router;
