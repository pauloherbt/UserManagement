import type { Knex } from "knex";
import { knexConnection } from "../src/db/db";


export async function up(knex: Knex): Promise<void> {
    knexConnection.schema.createTable('users',(table)=>{
        table.increments('id');
        table.string('name');
        table.bigint('age');
    }).catch((err)=>console.log(err));
}


export async function down(knex: Knex): Promise<void> {
    knexConnection.schema.dropTable('users');
}

