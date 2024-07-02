import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyCookieExistence(req:FastifyRequest,res:FastifyReply) {
    const sessionId = req.cookies.sessionId;
    if (!sessionId)
        return res.status(401).send({ Error: "Unauthorized" });
}