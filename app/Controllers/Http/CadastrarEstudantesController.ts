import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'

export default class CadastrarEstudantesController {
    public async executar({ request, response }: HttpContextContract) {
        try {
            const resultado = request.only(['nome', 'endereco', 'curso', 'telefone', 'email'])

            const emailExiste = await Estudante.findBy('email', resultado.email);

            if (emailExiste) {
                return response.status(500).json({ error: 'Erro esse email já existe' });
            } else {
                const estudante = await Estudante.create({
                    nome: resultado.nome,
                    endereco: resultado.endereco,
                    curso: resultado.curso,
                    telefone: resultado.telefone,
                    email: resultado.email
                })
                return response.json(estudante);
            }
        } catch (err) {
            console.error(err.message);
            return response.status(500).json({ error: 'Erro ao cadastrar o estudante' });
        }
    }
}
