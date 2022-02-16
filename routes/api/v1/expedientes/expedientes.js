const express = require("express");
const router = express.Router();

const Expedientes = require("../../../../dao/expedientes/expedientes.model");
const expedienteModel = new Expedientes();

router.get("/", (req, res) => {
  res.status(200).json({
    endpoint: "Expedientes",
    updates: new Date(2022, 0, 19, 18, 41, 0),
  });
}); //GET /

router.get("/all", async (req, res) => {
  try {
    const rows = await expedienteModel.getAll();
    res.status(200).json({ status: "ok", pacientes: rows });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "failed" });
  }
});

router.get("/byid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const row = await expedienteModel.getById(id);
    res.status(200).json({ status: "ok", pacientes: row });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "failed" });
  }
});

router.post("/new", async (req, res) => {
  const { identidad, fecha, descripcion, observacion, registros, ultimaActualizacion } = req.body;
  try {
    rslt = await expedienteModel.new(
      identidad,
      fecha,
      descripcion,
      observacion,
      registros,
      ultimaActualizacion
    );
    res.status(200).json({
      status: "ok",
      result: rslt,
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).json({
      status: "failed",
      result: {},
    });
  }
}); //POST /new

router.put('/update/:id', async (req, res) => {
  try {
    const { identidad, fecha, descripcion, observacion, registros, ultimaActualizacion } = req.body;
    const { id } = req.params;
    const result = await expedienteModel.updateOne(id, identidad, fecha, descripcion, observacion, registros, ultimaActualizacion);
    res.status(200).json({status: 'ok', result})
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 'failed'})
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await expedienteModel.deleteOne(id);
    res.status(200).json({status: 'ok', result})
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 'failed'})
  }
});

module.exports = router;