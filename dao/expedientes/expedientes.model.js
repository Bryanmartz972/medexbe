const ObjectId = require('mongodb').ObjectId;
const getDb = require("../mongodb");
let db = null;

class Expedientes {

  collection = null;
  constructor() {
    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('Expedientes')
        if (process.env.MIGRATE === "true") {
          //Por si se necesita
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async new (identidad, fecha, descripcion, observacion, registros, ultimaActualizacion) {
    const newExpediente = {
      identidad,
      fecha,
      descripcion,
      observacion,
      registros,
      ultimaActualizacion
    };
    return await this.collection.insertOne(newExpediente)
  }

  async getAll() {
    const cursor = this.collection.find({});
    const documents = await cursor.toArray();
    return documents;
  }

  async getById(id) {
    const _id = new ObjectId(id);
    const filter = {_id};
    return await this.collection.findOne(filter);
    
  }

  async updateOne(id, identidad, fecha, descripcion, observacion, registros, ultimaActualizacion) {
    const filter = { _id: new ObjectId(id)};
    //UPDATE EXPEDIENTES SET campo=valor, campo=valor where id = id;
    const updateCmd = {
      '$set':{
        identidad,
        fecha,
        descripcion,
        observacion,
        registros,
        ultimaActualizacion
      }
    };
    return await this.collection.updateOne(filter, updateCmd);
  }

  async deleteOne(id) {
    const _id = new ObjectId(id);
    const filter = {_id};
    return await this.collection.deleteOne(filter);
  }
}

module.exports = Expedientes;
