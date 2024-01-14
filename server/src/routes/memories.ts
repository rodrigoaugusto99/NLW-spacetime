import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'


export async function memoriesRoutes(app: FastifyInstance){
    
    app.get('/memories', async () => {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt: 'asc',
            }
        })
        return memories.map((memory) => {
            return {
                id:memory.id,
                coverUrl: memory.coverUrl,
                excerpt: memory.content.substring(0, 115).concat('...'),
            }
        })
    })

    app.get('/memories/:id', async (request) => {
        //const { id } = request.params

        const paramsSchema = z.object({
            id: z.string(),
        })

        const { id } = paramsSchema.parse(request.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })
        return memory
    })

    app.post('/memories', async (request) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        })

        const { content,  coverUrl, isPublic} = bodySchema.parse(request.body)

        const memory = await prisma.memory.create({
            data: {
                content, 
                coverUrl, 
                isPublic,
                userId: 'f02aae2c-5eb4-45bb-8b61-24db3c2fbbe9',
            }
        })
        return memory
    })

    app.put('/memories/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string(),
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        })

        const { content,  coverUrl, isPublic} = bodySchema.parse(request.body)

        const newMemory = await prisma.memory.update({
            where: {
                id,
            },
            data: {
                content,
                coverUrl,
                isPublic,
            }
        })
        return newMemory
        
    })

    app.delete('/memories/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.memory.delete({
            where: {
                id,
            }
        })
    })
}