import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class LoginController {
    public async executar({ auth, request, response }: HttpContextContract) {
        try {
            const resultado = request.only(['email', 'password'])

            const login = await Usuario.findBy('email', resultado.email);
            if (!login) {
                return response.status(500).json({ error: 'Erro email não encontrado' })
            }

            if (!(await Hash.verify(login.password, resultado.password))) {
                return response.status(500).json({ error: 'Credenciais erradas' });
            }

            const token = await auth.use('api').generate(login);

            return response.json({
                token: token.token,
                tipo: token.type,
                usuario: login
            })

        } catch (err) {
            console.error(err.message);
            return response.status(500).json({ error: 'Erro ao logar o usuário' })
        }
    }
}