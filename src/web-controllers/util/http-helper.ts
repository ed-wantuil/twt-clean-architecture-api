import { HttpResponse } from '@/web-controllers/ports'

export const create = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})
