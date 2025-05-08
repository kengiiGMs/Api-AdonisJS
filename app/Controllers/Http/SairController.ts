import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SairController {
    public async executar({ auth, response }: HttpContextContract) {
        try {
            await auth.use('api').revoke()
            return response.json({ message: "Deslogado" })
        } catch (err) {
            console.error(err.message);
            return response.status(500).json({ error: 'Erro ao efetuar logout o usuário' })
        }
    }
}
