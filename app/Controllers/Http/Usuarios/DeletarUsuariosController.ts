import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario';
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class DeletarUsuariosController {
    public async handle({ response, params }: HttpContextContract) {
        const usuarioId = Number(params.usuario_id);

        if (!usuarioId) {
            throw new ApiErrorException('Id não encontrado na url', 404, 'E_ID_NO_EXIST')
        }

        const usuarioExiste = await Usuario.findBy('id', usuarioId)

        if (!usuarioExiste) {
            throw new ApiErrorException('Usuário não encontrado', 404, 'E_USUARIO_NO_EXIST')
        }

        await Usuario.query().where('id', usuarioId).delete();
        return response.json({ message: "Usuário deletado com sucesso!", idDeletado: `${usuarioId}` })
    }
}
