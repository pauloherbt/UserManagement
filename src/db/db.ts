import {Knex,knex} from "knex";

export const config:Knex.Config = {
    client: 'sqlite3',
    connection:{
        filename:"src/db/db.sqlite"
    },
    useNullAsDefault:true
}

export const knexConnection = knex(config);