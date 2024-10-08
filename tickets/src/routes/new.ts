import express, { Response, Request} from 'express'
import { requireAuth, validateRequest } from '@common-auth/common'
import { body } from 'express-validator'
import { Ticket } from '../models/tickets'

const router = express.Router()

router.post('/api/tickets', requireAuth, [
    body('title')
    .not()
    .isEmpty()
    .withMessage('Title cannot be empty'),
    body('price')
    .isFloat({ gt: 0 })
    .withMessage('price must be greater than 0')
],
validateRequest, 
async (req: Request, res: Response) => {
    const { title , price} = req.body
    
    const ticket = Ticket.build({title, price, userId: req.currentUser!.id })
    await ticket.save()
    
    res.status(201).send(ticket)
})

export { router as createTicketRouter} ;