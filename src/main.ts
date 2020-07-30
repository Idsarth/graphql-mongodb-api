import 'reflect-metadata'
import { Env } from './environment'

const main = async () => {
  const app = await server.start()
  app.listen(Env.PORT)
}

main()
