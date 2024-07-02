import { FastifyReply, FastifyRequest } from "fastify";
import {z } from "zod";
import { Transaction } from "../models/Transaction";

export async function validateTransactionRequest(req:FastifyRequest,res:FastifyReply):Promise<Transaction>{
    const post_schema = z.object({title:z.string(),
        amount:z.coerce.number(),
        type:z.enum(['credit','debit'])})
    const result = post_schema.safeParse(req.body);
    if(result.error)
        throw result.error;
    return result.data;
}