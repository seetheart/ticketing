import request from "supertest";
import { app } from '../../app'
import { Ticket } from "../../models/tickets";

it('can fetch all the tickets', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "title 1",
            price: 10
        })
        .expect(201)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "some title 2",
            price: 10
        })
        .expect(201)

    const response =  await request(app)
        .get('/api/tickets')
        .send({})
        .expect(200)
    
    expect(response.body.length).toEqual(2)
})