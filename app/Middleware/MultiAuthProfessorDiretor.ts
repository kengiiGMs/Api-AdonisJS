import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class MultiAuthProfessorDiretor {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    try {
      await auth.use('diretor').authenticate()
    } catch (error) {
      try {
        await auth.use('professor').authenticate()
      } catch (error) {
        throw new ApiErrorException('Usuário não autenticado', 401, 'E_UNAUTHORIZED_ACCESS')
      }
    }
    await next()
  }
}
