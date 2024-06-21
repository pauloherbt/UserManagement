import fast from 'fastify';
import { UserRepository } from './repository/UserRepository';
import { User } from './models/user';
const app = fast();

const userRepository = new UserRepository();

app.listen({port:3333}).then(()=>console.log("Http server running!"));

app.post("/users",(req,res)=>{
    const {name,age} = req.body as User;
    return userRepository.create(name,age);
})

app.get('/users',()=>userRepository.findAll());

app.get('/users/:id',(req,res)=>{
    const id = req.params.id as number;
    return (userRepository.findById(id))
});

app.put('/users/:id',(req,res)=>{
    const id = req.params.id as number;
    return userRepository.update(id,req.body as User);
})





