import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RemoverTokenEstudantesController {
    public async handle({ response, auth }: HttpContextContract) {
        await auth.use('usuario').revoke()
        return response.json({ message: "Deslogado" })
    }
}