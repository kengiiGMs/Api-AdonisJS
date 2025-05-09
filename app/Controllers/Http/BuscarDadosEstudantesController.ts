import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'

export default class BuscarDadosEstudantesController {
    public async executar({ request, response, params }: HttpContextContract) {
        try {
            const estudanteId = params.estudante_id;
            const estudanteExiste = await Estudante.findBy('id', estudanteId);
            if (!estudanteExiste) {
                return response.status(500).json({ error: 'Erro esse estudante não existe' });
            } else {
                return response.json(estudanteExiste);
            }

        } catch (err) {
            console.error(err.message);
            return response.status(500).json({ error: 'Erro ao listar dados do estudante' });
        }
    }
}
