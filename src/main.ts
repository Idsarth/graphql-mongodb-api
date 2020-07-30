import 'reflect-metadata'
import { connectDB } from './database/connect'
import { Server } from './server'

// Import environment
import { Env } from './environment'

const main = async () => {
  const server = new Server()
  try {
    connectDB()
    await server.start(() => console.log(`Server ready and listening at ${Env.PORT}`))
  } catch (error) {
    console.log(error)
  }
}

main()
