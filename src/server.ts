import fast from 'fastify';;
import { env } from './config/env';
import { userRoutes } from './routes/user';
import { transactionsRoutes } from './routes/transactions';

import cookie from '@fastify/cookie'
export const app = fast();

app.listen({ port: env.PORT }).then(() => console.log('HTTP Server running on port: '+env.PORT));
app.register(cookie);
//routes
app.register(userRoutes,{prefix:'/users'});
app.register(transactionsRoutes,{prefix:'/transactions'});





