import request from 'supertest'
import { describe, expect, it } from "vitest"
import { app } from '../server'
import { Transaction } from '../models/Transaction';

describe('unit test transactions routes', () => {
    const url = '/transactions';
    it('should create a Transaction returning 201', async () => {
        const transaction: Transaction = { title: "teste", amount: 100, type: 'credit' }
        const res = await request(app.server)
            .post(url).send(transaction).accept('application/json');

        expect(res.status).toEqual(201);
        expect(res.body).contain(transaction)
    })
})