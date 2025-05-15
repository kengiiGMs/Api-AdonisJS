import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante';
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class BuscarEstudantesController {
    public async handle({ response, params }: HttpContextContract) {
        const estudanteId = Number(params.estudante_id);

        if (!estudanteId) {
            throw new ApiErrorException('Id não encontrado na url', 404, 'E_ID_NO_EXIST')
        }

        const estudante = await Estudante.findBy('id', estudanteId);

        if (!estudante) {
            throw new ApiErrorException('Estudante não encontrado', 404, 'E_ESTUDANTE_NO_EXIST')
        }

        return response.json(estudante);
    }
}