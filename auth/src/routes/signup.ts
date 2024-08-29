import express, { Response, Request} from 'express'
import { body, validationResult } from 'express-validator'

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
            return res.status(400).send(errors.array())
        }
        const { email, password } = req.body
        console.log("creatinga  suer")
        res.send({})
        
})

export { router as signupRouter }