import { knexConnection } from './../db/db';
import { Transaction } from "../models/Transaction";

export class TransactionRepository{

    async create(transaction:Transaction){
        return (await knexConnection<Transaction>('transactions').insert(transaction,'*')).at(0);
    }
}