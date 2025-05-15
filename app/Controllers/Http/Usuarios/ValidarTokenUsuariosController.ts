import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ValidarTokenUsuariosController {
    public async handle({ response, auth }: HttpContextContract) {
        const validar = await auth.use('usuario').authenticate()
        auth.use('usuario').isLoggedIn
        return response.json({ message: "Logado", usuario: validar })
    }
}