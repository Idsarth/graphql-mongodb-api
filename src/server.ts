import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

// Import environment
import { Env } from './environment'

// Import resolvers

export class Server {
  public app: Application

  private constructor() {
    this.app = express()
  }

  static start(): void {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [],
        validate: false,
        emitSchemaFile: true
      }),
      context: ({ req, res } => ({ req, res }))
    })
    server.applyMiddleware({ path: '/graphql' })
  }
}