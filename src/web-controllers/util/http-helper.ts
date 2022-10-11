import { HttpResponse } from '@/web-controllers/ports'

export const create = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (data: any): HttpResponse => ({
  statusCode: 400,
  body: data
})
