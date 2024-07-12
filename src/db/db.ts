import {Knex,knex} from "knex";
import { env } from "../config/env";

export const config:Knex.Config = {
    client: 'sqlite3',
    connection:{
        filename: env.DB_URL
    },
    useNullAsDefault:true
}

export const knexConnection = knex(config);