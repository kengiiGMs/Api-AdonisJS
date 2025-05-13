import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class DeletarEstudantesController {
    public async handle({ request, response, params }: HttpContextContract) {
        const estudanteId = Number(params.estudante_id);

        if (!estudanteId) {
            throw new ApiErrorException('Id não encontrado na url', 404, 'E_ID_NO_EXIST')
        }

        const estudanteExiste = await Estudante.findBy('id', estudanteId)

        if (!estudanteExiste) {
            throw new ApiErrorException('Estudante não encontrado', 404, 'E_ESTUDANTE_NO_EXIST')
        }

        await Estudante.query().where('id', estudanteId).delete();
        return response.json({ message: "Estudante deletado com sucesso!", idDeletado: `${estudanteId}` })
    }
}
