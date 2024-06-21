import { User } from './../models/user';
import {knex} from './../db/db';

export class UserRepository{

    

    constructor(){
        knex.schema.hasTable('users').then((exists)=>{
            if(!exists){
                console.log("criando tabela");
                knex.schema.createTable('users',(table)=>{
                    table.increments('id');
                    table.string('name');
                    table.bigint('age');
                }).catch((err)=>console.log(err));
            }
        });
    }   

    async create(name:string, age:number) {
        return await knex<User>('users').insert({name,age}).then((id)=>{
            return knex.select().from('users').where('id',id[0]).then((resp)=>resp[0]);
        });
    }

    findAll(){
        return knex<User[]>('users').select().limit(10).returning('*');
    }
    
    async findById(id:number){
        return await knex<User>('users').select().where('id',id).returning('*').then((user)=>user[0]);
    }
    
    update(id: number,upUser:User) {
        return knex<User>('users').select().where('id',id).then((user)=>{
            if(user[0]!=null){
                return knex('users').update({...upUser,id:id}).where('id',id).returning('*').then((user)=>user[0]);
            }
            throw new Error("user not found");
            
        })}
    }