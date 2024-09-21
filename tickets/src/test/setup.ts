import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from '../app';
import request from 'supertest'
import jwt from 'jsonwebtoken'

let mongo: any

declare global {
    var signin: () => string[];
}


beforeAll(async() => {
    process.env.JWT_KEY = 'asdfasdf'
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
    const collections = await mongoose.connection.db?.collections()
    if(collections){
        for(let collection of collections){
            await collection.deleteMany({})
        }
    }
})

afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
  });

//We have defined global in the top of the page
global.signin = () => {
    const id = new  mongoose.Types.ObjectId().toHexString()
    // build a JWT payload
    const payload = {
        id: id,
        email: "some@gmail.com"
    }
    // create jwt token
    const token = jwt.sign(payload, process.env.JWT_KEY!)

    // build session object
    const session = { jwt: token}

    // turn session into JSOM
    const sessionJSON = JSON.stringify(session)


    // take json and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64')
    
    return [`session=${base64}`];
}