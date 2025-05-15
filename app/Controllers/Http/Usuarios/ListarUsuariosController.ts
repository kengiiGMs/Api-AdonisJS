import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class ListarUsuariosController {
    public async handle({ response }: HttpContextContract) {
        const usuario = await Usuario.all();
        return response.json(usuario);
    }
}