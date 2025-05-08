import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'

export default class AtualizarEstudantesController {
    public async executar({ request, response, params }: HttpContextContract) {
        try {
            const resultado = request.only(['nome', 'endereco', 'curso', 'telefone', 'email'])
            const estudanteId = params.estudante_id;
            const estudanteExiste = await Estudante.findBy('id', estudanteId);

            if (!estudanteExiste) {
                return response.status(500).json({ error: 'Erro esse estudante não existe' });
            }

            if (estudanteExiste.email != resultado.email) {
                const emailExiste = await Estudante.findBy('email', resultado.email);

                if (emailExiste) {
                    return response.status(500).json({ error: 'Erro esse email já existe' });
                }
            }

            await Estudante.query().where('id', estudanteId).update(resultado);
            return response.json({ message: 'Estudante editado com sucesso' });

        } catch (err) {
            console.error(err.message);
            return response.status(500).json({ error: 'Erro ao editar o estudante' });
        }
    }
}