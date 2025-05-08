import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuarioCadastrarController {
    public async executar({ request, response }: HttpContextContract) {
        try {
            const resultado = request.only(['email', 'password'])

            const emailExiste = await Usuario.findBy('email', resultado.email)

            if (emailExiste) {
                return response.status(500).json({ error: 'Erro esse email já existe' })
            } else {
                const usuario = await Usuario.create({
                    email: resultado.email,
                    password: resultado.password,
                })
                return response.json(usuario)
            }
        } catch (err) {
            console.error(err.message);
            return response.status(500).json({ error: 'Erro ao cadastrar o usuário' })
        }
    }
}