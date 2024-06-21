import { User } from './../models/user';
import {knexConnection} from './../db/db';

export class UserRepository{ 

    async create(name:string, age:number) {
        return await knexConnection<User>('users').insert({name,age}).then((id)=>{
            return knexConnection.select().from('users').where('id',id[0]).then((resp)=>resp[0]);
        });
    }

    findAll(){
        return knexConnection<User[]>('users').select().limit(10).returning('*');
    }
    
    async findById(id:number){
        return await knexConnection<User>('users').select().where('id',id).returning('*').then((user)=>user[0]);
    }
    
    update(id: number,upUser:User) {
        return knexConnection<User>('users').select().where('id',id).then((user)=>{
            if(user[0]!=null){
                return knexConnection('users').update({...upUser,id:id}).where('id',id).returning('*').then((user)=>user[0]);
            }
            throw new Error("user not found");
            
        })}
    }