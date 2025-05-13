import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RemoverTokenEstudantesController {
    public async handle({ request, response, auth }: HttpContextContract) {
        await auth.use('estudante').revoke()
        return response.json({ message: "Deslogado" })
    }
}