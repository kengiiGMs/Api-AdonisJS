import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'

export default class ListarEstudantesController {
    public async executar({ request, response }: HttpContextContract) {
        try {
            const data = await Estudante.all();
            return response.json(data);
        } catch (err) {
            console.error(err.message);
            return response.status(500).json({ error: 'Erro ao listar estudantes' });
        }
    }
}
