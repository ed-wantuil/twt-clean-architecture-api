import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { UserData } from '@/entities'
import { badRequest, create } from '@/web-controllers/util'
import { MissingParamError } from '@/web-controllers/erros/missing-param-error'

export class RegisterUserController {
  private readonly useCase: RegisterUserOnMailingList

  constructor (useCase: RegisterUserOnMailingList) {
    this.useCase = useCase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.name || !request.body.email) {
      let missingParam: string = !request.body.name ? 'name ' : ''
      missingParam += !request.body.email ? 'email' : ''

      return badRequest(new MissingParamError(missingParam.trim()))
    }

    if (!request.body.email) {
      return badRequest('email')
    }

    const userData: UserData = request.body
    const response = await this.useCase.registerUserOnMaillingList(userData)

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return create(response.value)
    }
  }
}
