import express, { Response, Request} from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'

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
    (req: Request, res: Response) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array())
        }
        const { email, password } = req.body
        console.log("creatinga  suer")
        throw new DatabaseConnectionError()
        res.send({})
        
})

export { router as signupRouter }