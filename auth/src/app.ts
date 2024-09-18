import express from 'express';
import 'express-async-errors'
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler, NotFoundError } from '@common-auth/common';

const app = express()
app.use(express.json())
// Becuase traffic is proxied through nginx
app.set('trust proxy', true)

app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
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

export { app };
