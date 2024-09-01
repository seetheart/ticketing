import request from "supertest";
import { app } from '../../app'

it('responds with detail about the current user', async () => {
    const cookie = await global.signin()
    
    const response =  await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie ? cookie[0] : 'empty')
        .send()
        .expect(200)
    
    expect(response.body.currentUser.email).toEqual('test@gmail.com')
})

it('returns null if not authenticated', async () => {
    const cookie = await global.signin()
    
    const response =  await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)

        expect(response.body.currentUser).toEqual(null)
})

