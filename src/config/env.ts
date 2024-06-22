import { config } from 'dotenv'
import {z} from 'zod'

config();

const envSchema = z.object({
    DB_URL: z.string().default(""),
    PORT: z.string().transform((port)=>parseInt(port)).default('8080')
})

const envResult = envSchema.safeParse(process.env);
if(envResult.error)
    throw new Error(envResult.error.format().toString())
export const env = envResult.data;