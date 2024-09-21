import express, { Response, Request} from 'express'
import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError } from '@common-auth/common'
import { Ticket } from '../models/tickets'
import { body } from 'express-validator'

const router = express.Router()

router.put('/api/tickets/:id', requireAuth,
    [
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
    const ticket = await Ticket.findById(req.params.id)
    const { title, price } = req.body
    
    if(!ticket){
        throw new NotFoundError() 
    }

    if(req.currentUser?.id !== ticket.userId){
        throw new NotAuthorizedError();
    }

    ticket.set({
        title,
        price
    })

    await ticket.save()
    res.status(200).send(ticket)

})

export { router as updateTicketRouter }