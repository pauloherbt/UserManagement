import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('name');
        table.bigint('age');
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    }).raw("CREATE TRIGGER update_timestamp " +
            "AFTER UPDATE ON users " +
            "FOR EACH ROW " +
            "BEGIN UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id; END;")
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}

