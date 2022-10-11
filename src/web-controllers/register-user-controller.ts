import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { UserData } from '@/entities'
import { badRequest, create, serverError } from '@/web-controllers/util'
import { MissingParamError } from '@/web-controllers/erros/missing-param-error'
import { UseCase } from '@/usecases/register-user-on-mailing-list/ports'

export class RegisterUserController {
  private readonly useCase: UseCase

  constructor (useCase: UseCase) {
    this.useCase = useCase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.name || !request.body.email) {
        let missingParam: string = !request.body.name ? 'name ' : ''
        missingParam += !request.body.email ? 'email' : ''

        return badRequest(new MissingParamError(missingParam.trim()))
      }

      if (!request.body.email) {
        return badRequest('email')
      }

      const userData: UserData = request.body
      const response = await this.useCase.perform(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      if (response.isRight()) {
        return create(response.value)
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
