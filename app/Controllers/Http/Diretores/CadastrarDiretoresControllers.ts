import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Diretor from 'App/Models/Diretor'
import Usuario from 'App/Models/Usuario'
import { schema } from '@ioc:Adonis/Core/Validator'
import { diretorMensagensValidacao } from 'App/Enums/ValidatorMessages'
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class CadastrarDiretoresController {
    public async handle({ request, response, params }: HttpContextContract) {
        const dadosNecessarios = schema.create({
            nome: schema.string([]),
        })

        const usuarioId = Number(params.usuario_id);

        const dadosRequisicao = await request.validate({
            schema: dadosNecessarios,
            messages: diretorMensagensValidacao
        })

        const usuarioExiste = await Usuario.findBy('id', usuarioId)

        if (!usuarioExiste) {
            throw new ApiErrorException('Usuário não encontrado', 404, 'E_USUARIO_NO_EXIST')
        }

        const diretor = await Diretor.create({
            nome: dadosRequisicao.nome,
            usuario_id: usuarioId
        })

        return response.json(diretor)
    }
}