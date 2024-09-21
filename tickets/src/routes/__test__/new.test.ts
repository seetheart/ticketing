import request from "supertest";
import { app } from '../../app'
import { Ticket } from "../../models/tickets";

it('has a route handlerlistening to /api/tickets', async () => {
    const response =  await request(app)
        .post('/api/tickets')
        .send({})
    
    expect(response.status).not.toEqual(404)
})

it('can only be accessed if user is signed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401)
})

it('return an error other than 401  if user is signedin', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({})

    expect(response.status).not.toEqual(401)

})

it('return an error if invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "",
            price: 200
        })
        .expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 200
        })
        .expect(400)
})

it('returns an error if invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "valid title",
            price: -10
        })
        .expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "valid title",
            price: 0
        })
        .expect(400)
})
it('creates a ticket with valid input', async () => {
    // add in a check to check if the record is saved in database
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "some title",
            price: 10
        })
        .expect(201)
    
    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
})
