import { bodyParser } from '@/main/config/middleware/body-parser'
import { Express } from 'express'
import { cors } from '@/main/config/middleware/cors'
import { contentType } from '@/main/config/middleware/content-type'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
