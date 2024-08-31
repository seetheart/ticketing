import express, { Response, Request} from 'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'

import { BadRequestError } from '../errors/bad-request-error'
import { validateRequest } from '../middlewares/validate-request'

const router = express.Router()

router.post('/api/users/signup',
    [
        body('email')
        .isEmail()
        .withMessage('Email must be valid'),
        body('password')
        .trim()
        .isLength({ min: 4, max: 20})
        .withMessage('Password should be of minimus 4 and maximum 20 length')
    ,
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })

        if(existingUser){
            console.log('Email in use')
            throw new BadRequestError('Email in use')
        }

        const user = User.build({ email, password })
        await user.save()

        // Generate jwt and store it in session
        // condition written to avoid typescript error for process.env.JWT_KEY
        // below code shifted to start of the application. But add ! before JWT below after movign
        // the logic to start of the app
        // if(!process.env.JWT_KEY){
        //     throw new Error('asfasf')
        // }

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!)

        req.session = {
            jwt: userJwt
        }

        res.status(201).send({ user })
        
})

export { router as signupRouter }