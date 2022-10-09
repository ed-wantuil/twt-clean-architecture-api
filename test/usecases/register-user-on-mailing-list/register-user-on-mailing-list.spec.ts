import { UserData } from '../../../src/entities/user-data'
import { UserRepository } from '../../../src/usecases/register-user-on-mailing-list/ports/user-repository'
import { RegisterUserOnMailingList } from '../../../src/usecases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '../../../src/usecases/register-user-on-mailing-list/repository/in-memory-repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await useCase.registerUserOnMaillingList({ name, email })
    const user = repo.findUserByEmail('any@email.com')
    expect((await user).name).toBe('any_name')
    expect(response.value.name).toEqual('any_name')
  })

  test('should add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidEmail = 'invalid_email'
    const error: Error = (await useCase.registerUserOnMaillingList({ name, email: invalidEmail })).value as Error
    const user = await repo.findUserByEmail('any@email.com')
    expect(user).toBeNull()
    expect(error.name).toEqual('InvalidEmailError')
  })

  test('should add user with invalid name to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const invalidName = ''
    const email = 'any@email.com'
    const error: Error = (await useCase.registerUserOnMaillingList({ name: invalidName, email })).value as Error
    const user = await repo.findUserByEmail('any@email.com')
    expect(user).toBeNull()
    expect(error.name).toEqual('InvalidNameError')
  })
})
