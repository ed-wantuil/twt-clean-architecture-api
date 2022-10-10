import { UserData } from '../../../entities'
import { UserRepository } from '../ports'

export class InMemoryUserRepository implements UserRepository {
  private readonly repository: UserData[]

  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      this.repository.push(user)
    }
  }

  async exists (user: UserData): Promise<boolean> {
    return await this.findUserByEmail(user.email) !== null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const found = this.repository.find(user => user.email === email)

    return found || null
  }
}
