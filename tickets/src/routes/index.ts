import express, { Response, Request} from 'express'
import { requireAuth, validateRequest } from '@common-auth/common'
import { body } from 'express-validator'
import { Ticket } from '../models/tickets'

const router = express.Router()

router.get('/api/tickets', async (req: Request, res: Response) => {
    
    const tickets = await Ticket.find({})
    
    res.status(200).send(tickets)
})

export { router as indexTicketRouter} ;