import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'

export default class ListarEstudantesController {
    public async handle({ request, response }: HttpContextContract) {
        const estudante = await Estudante.all();
        return response.json(estudante);
    }
}