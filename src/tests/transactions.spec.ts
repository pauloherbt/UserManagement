import request from 'supertest'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { app } from '../server'
import { Transaction } from '../models/Transaction';
import { execSync } from "child_process"

describe('unit test transactions routes', () => {
    
    beforeEach(()=>{
        execSync("npx knex migrate:latest")
    })
    afterEach(()=>{
        execSync('npx knex migrate:rollback --all')
    })
    
    const url = '/transactions';

    it.skip('should create a Transaction returning 201', async () => {
        const transaction: Transaction = { title: "teste", amount: 100, type: 'credit' }
        const res = await request(app.server)
            .post(url).send(transaction).accept('application/json');
        
        expect(res.status).toEqual(201);
        expect(res.body).contain(transaction)
    });

    it('should return all transactions by user',async()=>{
        const transaction: Transaction = { title: "teste", amount: 100, type: 'credit' }
        const createTransac = await request(app.server).post(url).send(transaction);
        const cookies = createTransac.get('Set-Cookie') as string[];
        
        const rest = await request(app.server).get(url).set('Cookie',cookies);
        expect(rest.status).equals(200);
        expect(rest.body.transactions).toEqual([expect.objectContaining(transaction)]);
    })
})