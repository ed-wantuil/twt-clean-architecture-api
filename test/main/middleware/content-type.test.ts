import request from 'supertest'
import app from '@/main/config/app'

describe('Content type Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test_content_type', /json/)
      .expect('content-type', /json/)
  })

  test('should return xml content type when forced, async ()', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
