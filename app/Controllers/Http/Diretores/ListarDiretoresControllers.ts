import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Diretor from 'App/Models/Diretor';

export default class ListarDiretoresController {
    public async handle({ response }: HttpContextContract) {
        const diretor = await Diretor.query().preload('usuario')
        return response.json(diretor);
    }
}