import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RemoverTokenProfessoresController {
    public async handle({ request, response, auth }: HttpContextContract) {
        await auth.use('professor').revoke()
        return response.json({ message: "Deslogado" })
    }
}