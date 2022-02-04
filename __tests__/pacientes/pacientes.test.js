const app = require('../../app');
const supertest = require("supertest");

describe('test suite de api v1 pacientes endpoint', () => { 
  it("GET /api/v1/pacientes/", async () => {
    await supertest(app).get('/api/v1/pacientes/').set({apitoken:'e47641db-a9be-4d53-9ce8-76ad85889fdf'}).expect(200);
  })
})