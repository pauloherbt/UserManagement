import {Knex} from 'knex'

declare module 'knex/types/tables'{
    export interface Tables{        
        users:{
            id:number,
            name:string,
            age:number,
            updated_at:Date,
            created_at:Date
        },
        transactions:{
            id:string,
            sessionId:string,
            title:string,
            amount:number,
            type:string,
            updated_at:Date,
            created_at:Date
        }
    }
}
