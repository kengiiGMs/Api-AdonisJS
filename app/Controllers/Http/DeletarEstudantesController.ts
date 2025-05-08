import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'

export default class DeletarEstudantesController {
    public async executar({ request, response, params }: HttpContextContract) {
        try {
            const estudanteId = params.estudante_id;
            console.log(estudanteId);
            const estudanteExiste = await Estudante.findBy('id', estudanteId);

            if (!estudanteExiste) {
                return response.status(500).json({ error: 'Erro esse estudante não existe' });
            } else {
                await Estudante.query().where('id', estudanteId).delete();
                return response.json({ message: 'Estudante deletado com sucesso' });
            }
        } catch (err) {
            console.error(err.message);
            return response.status(500).json({ error: 'Erro ao cadastrar o estudante' });
        }
    }
}
