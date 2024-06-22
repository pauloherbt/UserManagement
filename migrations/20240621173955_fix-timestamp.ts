import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumns('created_at', 'updated_at');
    }).alterTable('users', (table) => {
        table.timestamps(true, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumns('created_at', 'updated_at').timestamps();
    })
}

