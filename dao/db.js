const sqlite3 = require('sqlite3');
let db = null;

//Declaracion de funcion
const initDB = () => {
  return new Promise((accept, reject) => {
    let database = new sqlite3.Database(//"../data/medexp.sqlite3" Ruta en duro
    `./data/${process.env.DB_FILENAME}.sqlite3`, (err) => { //Ruta variable
      if (err) {
        console.error(err);
        reject(err);
      }
      accept(database);
    });
  });
};

const singletonGetDB = async () => {
  if (!db) {
    db = await initDB();
  }
  return db;
};

const singletonGetDBnoPromise = () => {
  if (!db) {
    initDB()
      .then((database) => {
        db = database;
      })
      .catch((err) => {
        throw Error("Error de Database");
      });
  }
  return db;
};

module.exports = singletonGetDB;
