import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { UserData } from '@/entities'
import { create } from '@/web-controllers/util'

export class RegisterUserController {
  private readonly useCase: RegisterUserOnMailingList

  constructor (useCase: RegisterUserOnMailingList) {
    this.useCase = useCase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body
    const response = await this.useCase.registerUserOnMaillingList(userData)

    if (response.isRight()) {
      return create(response.value)
    }
  }
}
