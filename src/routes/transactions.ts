import { ZodError, z } from 'zod';
import { FastifyInstance } from "fastify";
import { TransactionRepository } from "../repository/TransactionRepository";
import { validateTransactionRequest } from "../middlewares/validate-transaction-request";
import { randomUUID } from 'crypto';
import { verifyCookieExistence } from '../middlewares/verify-cookie-existence';

const transacRepository = new TransactionRepository();

export async function transactionsRoutes(app: FastifyInstance) {

    app.post('/', async (req, res) => {

        const result = await validateTransactionRequest(req, res)
            .catch((error) => {
                if (error instanceof ZodError)
                    return res.status(400).send(error.format());
                throw new Error('generic error');
            });

        let sessionId = req.cookies.sessionId;
        if (!sessionId)
            sessionId = randomUUID();
        res.setCookie('sessionId', sessionId, { maxAge: 60 * 60, path: '/' });
        return res.status(201).send(await transacRepository.create({ ...result, sessionId }));
    });

    app.get('/',{preHandler:verifyCookieExistence}, async (req, res) => {
        const sessionId = req.cookies.sessionId || "";
        return transacRepository.findAll(sessionId);
    });

    app.get('/:id',{preHandler:verifyCookieExistence} ,async (req,res)=>{
        const sessionId = req.cookies.sessionId || "";
        const idSchema = z.object({id:z.string().uuid()})
        const {id} = idSchema.parse(req.params);
        return transacRepository.findById(id,sessionId);
    })

}