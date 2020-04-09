const request = require('supertest');
const app = require('../../src/app');
const connection =  require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll( async () => {
        await connection.destroy();
    })

    it('Shoud be able to create a new ong', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "Panda",
            email: "panda@gmail.com",
            whatsapp: "48000000011",
            city: "Curitiba",
            uf: "PR"
        })

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    });
});