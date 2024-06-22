import fast from 'fastify';
import { UserRepository } from './repository/UserRepository';
import { User } from './models/user';
import { env } from './config/env';

const app = fast();
const userRepository = new UserRepository();

app.listen({ port: env.PORT }).then(() => console.log('HTTP Server running on port: '+env.PORT));

app.post("/users", (req, res) => {
    const { name, age, description } = req.body as User;
    return userRepository.create(name, age, description);
})

app.get('/users', () => userRepository.findAll());

app.get('/users/:id', (req, res) => {
    const id = req.params.id as number;
    return (userRepository.findById(id))
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id as number;
    return userRepository.update(id, req.body as User);
})





