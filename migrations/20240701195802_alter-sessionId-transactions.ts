import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions',(tab)=>{
        tab.uuid('sessionId').after('id').index();
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions',(tab)=>{
        tab.dropColumn('sessionId');
    })
}

