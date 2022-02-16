require('dotenv').config();
const getDb = require('../dao/mongodb');

const names = [
  'Fulanito',
  'Menganito',
  'Sutanito',
  'Lulu',
  'Paco',
  'Hugo', 
  'Luis',
  'Donald'
]

const surnames = [
  'McQuack',
  'Rico',
  'Dtal',
  'De la Santa Cruz',
  'Melgar',
  'Cabildo',
  'Cadillo',
  'Che'
];

const pacientes = 50;
const pacientesArr = [];

for(let i = 0; i < pacientes; i++){
  let anio = ((new Date().getTime() % 2) === 0) ? 1980 + Math.floor(Math.random() * 20) : 2000 + Math.floor(Math.random() * 23);
  const nombres = names[Math.floor(Math.random() * 8)];
  const apellidos = surnames[Math.floor(Math.random()*8)];
  const secuencia = String(Math.ceil(Math.random() * 99999)).padStart(5,'0');
  const correo = (`${nombres}.${apellidos}@unmail.com`).toLowerCase();
  const telefono = `${(20000000 + Math.floor(Math.random() * 10000000))}`
  const doc = {
    nombres,
    apellidos,
    identidad: `0801${anio}${secuencia}`,
    telefono, 
    correo
  }
  pacientesArr.push(doc);
  
}

getDb().then(
  (db)=>{
    const pacientes = db.collection('Pacientes');
    pacientes.insertMany(pacientesArr, (err, rslt)=>{
      if(err){
        console.error(err);
        return;
      }
      console.log(rslt);
      return;
    });
  })