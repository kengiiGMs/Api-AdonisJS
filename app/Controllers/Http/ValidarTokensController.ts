import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ValidarTokensController {
    public async executar({ auth, response }: HttpContextContract) {
        try {
            await auth.use('api').authenticate()
            auth.use('api').isLoggedIn

            return response.json({ message: "Token é valido" })
        } catch (err) {
            console.error(err.message);
            return response.status(500).json({ error: 'Erro ao validar token' })
        }
    }
}
