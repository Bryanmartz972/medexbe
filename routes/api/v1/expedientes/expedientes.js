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
    res.status(200).json({ status: "ok", expedientes: rows });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "failed" });
  }
});

router.get("/byid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const row = await expedienteModel.getById(id);
    res.status(200).json({ status: "ok", expedientes: row });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "failed" });
  }
});

const allowedItemsNumber = [10, 15, 20];
router.get("/facet/:page/:items", async (req, res) => {
  const page = parseInt(req.params.page, 10);
  const items = parseInt(req.params.items, 10);
  if (allowedItemsNumber.includes(items)) {
    try {
      const expedientes = await expedienteModel.getFaceted(page, items);
      res.status(200).json({ docs: expedientes });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "failed" });
    }
  } else {
    return res.status(403).json({ status: "error", msg: "Not a valid item (10, 15, 20)" });
  }
});

router.get("/byidentidad/:id/:page/:items", async (req, res) => {
  const id = req.params.id;
  const page = parseInt(req.params.page, 10);
  const items = parseInt(req.params.items, 10);
  if (allowedItemsNumber.includes(items)) {
    try {
      const expedientes = await expedienteModel.getFaceted(page, items, { identidad: id});
      res.status(200).json({ docs: expedientes });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "failed" });
    }
  } else {
    return res.status(403).json({ status: "error", msg: "Not a valid item (10, 15, 20)" });
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

router.put("/addtag/:id", async (req, res) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;
    const result = await expedienteModel.updateAddTag(id, tag);
    res.status(200).json({ status: "ok", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed" });
  }
});

router.put("/addtagset/:id", async (req, res) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;
    const result = await expedienteModel.updateAddTagSet(id, tag);
    res.status(200).json({ status: "ok", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed" });
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