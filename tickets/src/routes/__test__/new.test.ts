import request from "supertest";
import { app } from '../../app'

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
    
})

it('returns an error if invalid price is provided', async () => {
    
})
it('creates a ticket with valid input', async () => {
    
})
