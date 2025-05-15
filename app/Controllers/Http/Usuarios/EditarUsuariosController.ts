import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { usuarioMensagensValidacao } from 'App/Enums/ValidatorMessages'
import ApiErrorException from 'App/Exceptions/ApiErrorException'
import Hash from '@ioc:Adonis/Core/Hash'

export default class EditarUsuariosController {
    public async handle({ request, response, params }: HttpContextContract) {
        const dadosNecessarios = schema.create({
            email: schema.string([rules.email()]),
            password: schema.string([rules.minLength(5), rules.confirmed()]),
        })

        const dadosRequisicao = await request.validate({
            schema: dadosNecessarios,
            messages: usuarioMensagensValidacao
        })

        const usuarioId = Number(params.usuario_id)

        if (!usuarioId) {
            throw new ApiErrorException('Id não encontrado na url', 404, 'E_ID_NO_EXIST')
        }

        const usuarioExiste = await Usuario.findBy('id', usuarioId)

        if (!usuarioExiste) {
            throw new ApiErrorException('Usuário não encontrado', 404, 'E_USUARIO_NO_EXIST')
        }

        if (usuarioExiste.email !== dadosRequisicao.email) {
            const emailExiste = await Usuario.findBy('email', dadosRequisicao.email);

            if (emailExiste) {
                throw new ApiErrorException('Esse email já está em uso', 400, 'E_EMAIL_EXIST')
            }
        }

        dadosRequisicao.password = await Hash.make(dadosRequisicao.password)

        await Usuario.query().where('id', usuarioId).update(dadosRequisicao)
        return response.json({ message: 'Usuário editado com sucesso' })
    }
}