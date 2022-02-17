const ObjectId = require('mongodb').ObjectId;
const getDb = require("../mongodb");
let db = null;

class Pacientes {
  
  collection = null;
  constructor() {
    getDb()
    .then((database) => {
      db = database;
        this.collection = db.collection('Pacientes')
        if (process.env.MIGRATE === "true") {
          //Por si se ocupa algo
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async new(nombres, apellidos, identidad, telefono, correo) {
    const newPaciente = {
      nombres,
      apellidos,
      identidad,
      telefono,
      correo
    };
    return await this.collection.insertOne(newPaciente);
  }

  async getAll() {
    const cursor = this.collection.find({});
    return await cursor.toArray();
  }

  async getById(id) {
    const _id = new ObjectId(id);
    const filter = {_id};
    return await this.collection.findOne(filter);
  }

  async getFaceted(page, items, filter = {}){
    const cursor = this.collection.find({});
    const totalItems = await cursor.count();
    cursor.skip((page - 1) * items);
    cursor.limit(items);

    const rslt = await cursor.toArray();
    return {totalItems, page, items, totalPages: (Math.ceil(totalItems/items)), rslt}; 
  }

  async updateOne(id, nombres, apellidos, identidad, telefono, correo) {
    const filter = { _id: new ObjectId(id)};
    //UPDATE PACIENTES SET campo=valor, campo=valor where id = id;
    const updateCmd = {
      '$set':{
        nombres,
        apellidos,
        identidad,
        telefono,
        correo
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

module.exports = Pacientes;
