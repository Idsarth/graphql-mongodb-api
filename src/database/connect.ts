import { connect, Mongoose } from 'mongoose'

// Import environment
import { Env } from '../environment'

export async function connectDB(): Promise<Mongoose> {
  try {
    const db = await connect(Env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(`Database is connected to ${db.connection.host}`)
    return db
  } catch (error) {
    console.log(error)
    return error
  }
}
