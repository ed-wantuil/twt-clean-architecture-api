import { bodyParser, contentType, cors } from '@/main/middleware/'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
