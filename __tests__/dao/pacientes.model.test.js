const res = require('express/lib/response');
const Pacientes = require('../../dao/pacientes/pacientes.model');
let lastId = 0;

describe('Testin Pacientes Model', () => {
  let pacientesModel = undefined;
  beforeAll( (done) => {
    pacientesModel = new Pacientes();
    setTimeout(() => {
      done();
    },3000)
  })

  it('pacientesModel Esta Definido', () => {
    return expect(pacientesModel).toBeDefined();
  })

  it('getAll Devuelve un array', async () => {
    const arrPacientes = await pacientesModel.getAll();
    return expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
  })

  it('new guarde un dato', async () => {
    const resultado = await pacientesModel.new( 'Test Prueba', 'Fulano', '00000001', '00000001', 'testprueba@gmail.com');
    
    lastId = resultado;
    return expect(resultado).toBeDefined();
  });

  it('obtener un dato', async () => {
    const resultado = await pacientesModel.getById( lastId );
    
    console.log(resultado)
    return expect(resultado.nombre).toBe('Test Prueba');
  });

  it('eliminar un dato', async () => {
    const resultado = await pacientesModel.deleteOne( lastId );
    
    console.log(resultado)
    return expect(resultado).toBeDefined();
  });
})