import express, { Response, Request} from 'express'
import { requireAuth } from '@common-auth/common'

const router = express.Router()

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
    res.status(200).send({})
})

export { router as createTicketRouter} ;