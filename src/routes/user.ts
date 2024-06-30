import { FastifyInstance } from "fastify";
import { UserRepository } from "../repository/UserRepository";
import {number, z} from 'zod';

const userRepository = new UserRepository();

export async function userRoutes(app:FastifyInstance) {
    app.post("/", (req) => {
        const user_schema = z.object({
            name:z.string(),
            age:z.number()
            }
        );
        return userRepository.create(user_schema.parse(req.body));
    })

    app.get('/', () => userRepository.findAll());
    
    app.get('/:id', async (req,res) => {
        const get_schema = z.object({id:z.coerce.number()})
        const result = get_schema.safeParse(req.params);
        if(result.error){
            return res.status(404).send(result.error.format());
        }
        return userRepository.findById(result.data.id);
    });
    
    app.put('/:id', (req) => {
        const put_schema = z.object({
            id:z.string().transform((val)=>parseInt(val)),name:z.string(),age:z.number()
        })
        const put_validated= put_schema.parse({id:req.params,name:req.body,age:req.body})
        return userRepository.update(put_validated.id,put_validated);
    })

}