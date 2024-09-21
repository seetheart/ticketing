import request from "supertest";
import { app } from '../../app'
import { Ticket } from "../../models/tickets";
import mongoose from "mongoose";

it('returns a 404 if the ticket id is not found', async () => {
    const id = new  mongoose.Types.ObjectId().toHexString()

    await request(app) 
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: "something",
            price: 13
        })
        .expect(400)
    
})

it('returns a 401 if the user is not authenticated', async () => {
    const id = new  mongoose.Types.ObjectId().toHexString()

    await request(app) 
        .put(`/api/tickets/${id}`)
        .send({})
        .expect(401)
    
})

it('returns a 401 if the user does not own the ticket', async () => {
    // create a ticket
    const response = await request(app) 
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "some title",
            price: 20
        })
        .expect(201)
    
    await request(app) 
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: "updated title",
            price: 25
        })
        .expect(401)
    
})

it('returns a 400 if the user provides wrong title and price', async () => {
    const cookie = global.signin()
    const response = await request(app) 
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: "some title",
            price: 20
        })
        .expect(201)

    await request(app) 
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: "",
            price: -1
        })
        .expect(400)
    
})

it('updated the ticket when valid input is given', async () => {
    const cookie = global.signin()
    const response = await request(app) 
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: "some title",
            price: 20
        })
        .expect(201)

     const update_response = await request(app) 
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: "updated title",
            price: 25
        })
        .expect(200)
    
    expect(update_response.body.title).toEqual("updated title")
    expect(update_response.body.price).toEqual(25)
    
})