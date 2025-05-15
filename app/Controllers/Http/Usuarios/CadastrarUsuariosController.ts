import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { usuarioMensagensValidacao } from 'App/Enums/ValidatorMessages'
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class CadastrarUsuariosController {
    public async handle({ request, response }: HttpContextContract) {
        const dadosNecessarios = schema.create({
            email: schema.string([rules.email()]),
            password: schema.string([rules.minLength(5), rules.confirmed()]),
            tipo: schema.string(),
        })

        const dadosRequisicao = await request.validate({
            schema: dadosNecessarios,
            messages: usuarioMensagensValidacao
        })

        const emailExiste = await Usuario.findBy('email', dadosRequisicao.email)

        if (emailExiste) {
            throw new ApiErrorException('Esse email já está em uso', 400, 'E_EMAIL_EXIST')
        } else {

            const usuario = await Usuario.create({
                email: dadosRequisicao.email,
                password: dadosRequisicao.password,
                tipo: dadosRequisicao.tipo,
            })

            return response.json(usuario)
        }
    }
}