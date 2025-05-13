import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RemoverTokenDiretoresController {
    public async handle({ request, response, auth }: HttpContextContract) {
        await auth.use('diretor').revoke()
        return response.json({ message: "Deslogado" })
    }
}