
import { UserData } from '../user-data'
import { UserRepository } from '../ports/user-repository'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[]

  constructor (repository: UserData[]) {
    this.repository = repository
  }

  add (user: UserData): Promise<void> {
    return null
  }

  exists (user: UserData): Promise<boolean> {
    return null
  }

  findAllUsers (): Promise<UserData[]> {
    return null
  }

  async findUserByEmail (email: string): Promise<UserData> {
    return null
  }
}
