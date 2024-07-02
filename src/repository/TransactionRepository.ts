import { knexConnection } from './../db/db';
import { Transaction } from "../models/Transaction";

export class TransactionRepository{

    async findById(transacId: string, sessionId: string) {
        return knexConnection('transactions').select('*').where({id:transacId,sessionId}).first();
    }

    async create(transaction:Transaction){
        const result = await knexConnection('transactions').insert(transaction,'*');
        return result[0];
    }

    async findAll(sessionId:string){
        const transactions = await knexConnection('transactions').select('*').where({sessionId});
        const total = transactions.reduce((prev,curr)=>prev+curr.amount,0);
        return {transactions,total};
    }
}