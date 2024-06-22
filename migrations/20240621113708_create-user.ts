import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users',(table)=>{
        table.increments('id');
        table.string('name');
        table.bigint('age');
        table.text('description').notNullable();
        table.timestamps();
    }).catch((err)=>console.log(err));
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}

