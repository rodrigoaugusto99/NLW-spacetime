import 'dotenv/config'
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

const app = fastify()

app.register(cors, {
  origin: true
})

app.register(jwt, {
  secret: 'spacetime'
})

app.register(memoriesRoutes)


app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server running on http://localhost:3333')
  })
