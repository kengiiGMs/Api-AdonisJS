import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ValidarTokenProfessoresontroller {
    public async handle({ request, response, auth }: HttpContextContract) {
        const validar = await auth.use('professor').authenticate()
        auth.use('professor').isLoggedIn
        return response.json({ message: "Logado", usuario: validar })
    }
}