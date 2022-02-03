const Pacientes = require('../../dao/pacientes/pacientes.model');

describe('Testin Pacientes Model', () => {
  let pacientesModel = undefined;
  beforeAll( () => {
    return pacientesModel = new Pacientes();
  })

  it('pacientesModel Esta Definido', () => {
    return expect(pacientesModel).toBeDefined();
  })

  it('getAll Devuelve un array', async () => {
    const arrPacientes = await pacientesModel.getAll();
    return expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
  })
})