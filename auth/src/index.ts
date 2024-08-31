import express from 'express';
import 'express-async-errors'
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express()
app.use(express.json())
// Becuase traffic is proxied through nginx
app.set('trust proxy', true)

app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.all('*', async(req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler)

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }
    try{
        console.log('connected to mongodb')
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    }
    catch(err){
        console.log(err)
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!')
    })   
}

start()

