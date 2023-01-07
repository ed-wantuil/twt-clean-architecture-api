import { MongoHelper } from '@/external/repositories/helper'
import * as process from 'process'

describe('Mongo User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONG_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('when user is added, it should exist', async () => {
    const userRepository = new MongodbUserRepository()
    const user = {
      name: 'any_name',
      email: 'any@mail.com'
    }
    await userRepository.add(user)

    expect(await userRepository.exists(user)).toBeTruthy()
  })
})
