import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class VerificarEstudante {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.use('usuario').authenticate()

    const usuario = auth.user

    if (!usuario) {
      throw new ApiErrorException('Usuário não autenticado', 401, 'E_UNAUTHORIZED_ACCESS')
    }

    if (usuario.tipo !== 'ESTUDANTE') {
      throw new ApiErrorException('Apenas estudantes podem acessar esta rota', 403, 'E_ESTUDANTE_ACESS')
    }
    await next()
  }
}
