import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante';

export default class ListarEstudantesController {
    public async handle({ response }: HttpContextContract) {
        const estudante = await Estudante.query().preload('usuario')
        return response.json(estudante);
    }
}