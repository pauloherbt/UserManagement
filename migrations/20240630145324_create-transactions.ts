import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions',(table)=>{
        table.uuid('id',{primaryKey:true}).defaultTo(knex.fn.uuid())
        table.string('title')
        table.decimal('amount')
        table.enum('type',['credit','debit'])
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    }).raw("CREATE TRIGGER update_timestamp_transactions " +
        "AFTER UPDATE ON transactions " +
        "FOR EACH ROW " +
        "BEGIN UPDATE transactions SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id; END;")
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions');
}

