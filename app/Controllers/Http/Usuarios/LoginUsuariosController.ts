import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { usuarioMensagensValidacao } from 'App/Enums/ValidatorMessages'
import ApiErrorException from 'App/Exceptions/ApiErrorException'
import Hash from '@ioc:Adonis/Core/Hash'

export default class LoginUsuariosController {
    public async handle({ auth, request, response }: HttpContextContract) {
        const dadosNecessarios = schema.create({
            email: schema.string([rules.email()]),
            password: schema.string([rules.minLength(5)])
        })

        const dadosRequisicao = await request.validate({
            schema: dadosNecessarios,
            messages: usuarioMensagensValidacao
        })

        const login = await Usuario.findBy('email', dadosRequisicao.email);

        if (!login) {
            throw new ApiErrorException('Email não encontrado', 404, 'E_EMAIL_NO_EXIST')
        }

        if (!(await Hash.verify(login.password, dadosRequisicao.password))) {
            throw new ApiErrorException('Credenciais erradas', 401, 'E_WRONG_CREDENTIAL')
        }

        const token = await auth.use('usuario').generate(login, {
            expiresIn: '7 days'
        });

        return response.json({
            token: token.token,
            tipo: token.type,
            usuario: login
        })
    }
}