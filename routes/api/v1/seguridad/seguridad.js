const express = require("express");
const router = express.Router();
const Usuarios = require('../../../../dao/usuarios/usuarios.model');
const usuariosModel = new Usuarios();
const jwt = require('jsonwebtoken');
const { authSchema } = require('../../../../helpers/validation_usuario');

router.post("/signin", async (req, res) => {
  try {
    let rslt = await authSchema.validateAsync(req.body);
    console.log(rslt);
    try {
      const { email, password, recoveryQuestion, recoveryAnswer } = req.body;
      let rslt = usuariosModel.new(email, password, recoveryQuestion, recoveryAnswer)
      res.status(200).json({ status: 'success', result: rslt })
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'failed' })
    }
  } catch (error) {
    console.error(error)
    res.status(422).json({ status: 'Error de validación de datos' });
  }

});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInDb = await usuariosModel.getByEmail(email);
    if (userInDb) {
      const isPasswordValid = await usuariosModel.comparePassword(password, userInDb.password)
      if (isPasswordValid) {
        const { email, roles, _id } = userInDb;
        const payload = {
          jwt: jwt.sign({ email, roles, _id }, process.env.JWT_SECRET),
          user: { email, password, _id }
        }
        res.status(200).json(payload);
      } else {
        res.status(400).json({ status: 'failed', error: 2 }) //Sus credenciales no son validas
      }
    } else {
      res.status(400).json({ status: 'failed', error: 1 })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'failed' })
  }
});

router.put("/recoverpassword/", async (req, res) => {
  try {
    const { email, recoveryAnswer, newPassword } = req.body;
    const userInDb = await usuariosModel.getByEmail(email);
    if (userInDb) {
      const answerInDb = await usuariosModel.getUserRecoveryAnswer(email);
      if (answerInDb == recoveryAnswer) {
        await usuariosModel.updateOne(email, newPassword);
        res.status(200).json({ status: "Ok", msg: "Su contraseña ha sido actualizada" })
      } else {
        res.status(406).json({ status: "failed", msg: "Datos enviados invalidos" })
      }
    } else {
      res.status(404).json({ status: "failed", msg: "El usuario no fue encontrado" })
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: "failed" });
  }
});

module.exports = router;