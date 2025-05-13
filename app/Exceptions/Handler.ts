import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    const { response } = ctx

    if (error.code === 'E_VALIDATION_FAILURE') {
      const mensagens = error.messages.errors.map((e: any) => e.message);

      return response.status(422).send({
        error: 'Erro de validação',
        detalhes: mensagens
      })
    }

    if (error.code == 'E_UNAUTHORIZED_ACCESS') {
      return response.status(401).send({
        error: 'Usuário não autenticado'
      })
    }

    if (error.code == 'E_ROUTE_NOT_FOUND') {
      return response.status(404).send({
        error: 'Rota não encontrada'
      })
    }

    if (error.code == 'E_EMAIL_EXIST') {
      return response.status(400).send({
        error: 'Esse email já existe'
      })
    }

    if (error.code == 'E_EMAIL_NO_EXIST') {
      return response.status(404).send({
        error: 'Email não encontrado'
      })
    }

    if (error.code == 'E_ID_NO_EXIST') {
      return response.status(404).send({
        error: 'Id não encontrado na url'
      })
    }

    if (error.code == 'E_ESTUDANTE_NO_EXIST') {
      return response.status(404).send({
        error: 'Estudante não encontrado'
      })
    }

    if (error.code == 'E_WRONG_CREDENTIAL') {
      return response.status(401).send({
        error: 'Erro crendenciais erradas'
      })
    }

    return response.status(500).send({
      error: 'Erro interno no servidor',
      detalhes: process.env.NODE_ENV === 'development' ? {
        code: error.code,
        stack: error.stack,
      } : undefined,
    })
  }
}

