import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { UserData } from '@/entities'
import { MongoHelper } from '@/external/repositories/helper'

export class MongodbUserRepository implements UserRepository {
  async add (user: UserData): Promise<void> {
    const userCollection = MongoHelper.getCollection('users')
    const exists = await this.exists(user)
    if (!exists) {
      await userCollection.insertOne(user)
    }
  }

  async exists (user: UserData): Promise<boolean> {
    const result = await this.findUserByEmail(user.email)
    if (result != null) {
      return true
    }
    return false
  }

  findAllUsers (): Promise<UserData[]> {
    return Promise.resolve([])
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const userCollection = MongoHelper.getCollection('users')
    const result = await userCollection.findOne({ email })
    return result
  }
}
