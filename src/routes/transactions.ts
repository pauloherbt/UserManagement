import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { TransactionRepository } from "../repository/TransactionRepository";

const transacRepository = new TransactionRepository();

export async function transactionsRoutes(app: FastifyInstance) {
    app.post('/', async (req,res) => {
        const post_schema = z.object({title:z.string(),amount:z.number(),type:z.enum(['credit','debit'])})
        const result = post_schema.safeParse(req.body);
        if(result.error)
            return res.status(400).send(result.error.format());
        return res.status(201).send(await transacRepository.create(result.data));
    })
}