import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { diretorMensagensValidacao } from 'App/Enums/ValidatorMessages'
import ApiErrorException from 'App/Exceptions/ApiErrorException'
import Hash from '@ioc:Adonis/Core/Hash'


export default class LoginProfessoresController {
    public async handle({ auth, request, response }: HttpContextContract) {
        const dadosNecessarios = schema.create({
            email: schema.string([rules.email()]),
            password: schema.string([rules.minLength(5)])
        })

        const dadosRequisicao = await request.validate({
            schema: dadosNecessarios,
            messages: diretorMensagensValidacao
        })

        const login = await Professor.findBy('email', dadosRequisicao.email);

        if (!login) {
            throw new ApiErrorException('Email não encontrado', 404, 'E_EMAIL_NO_EXIST')
        }

        if (!(await Hash.verify(login.password, dadosRequisicao.password))) {
            throw new ApiErrorException('Credenciais erradas', 401, 'E_WRONG_CREDENITAL')
        }

        const token = await auth.use('professor').generate(login, {
            expiresIn: '7 days'
        });

        return response.json({
            token: token.token,
            tipo: token.type,
            usuario: login
        })
    }
}