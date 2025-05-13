import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ValidarTokenDiretoresController {
    public async handle({ request, response, auth }: HttpContextContract) {
        const validar = await auth.use('diretor').authenticate()
        auth.use('diretor').isLoggedIn
        return response.json({ message: "Logado", usuario: validar })
    }
}