import 'reflect-metadata'
import { Server } from './server'

const main = async () => {
  const app = await Server.start()
}

main()
