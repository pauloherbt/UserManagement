import {knex as _knex} from "knex";

export const knex = _knex({
        client: 'sqlite3',
        connection:{
            filename:"src/db/db.sqlite"
        }
        });