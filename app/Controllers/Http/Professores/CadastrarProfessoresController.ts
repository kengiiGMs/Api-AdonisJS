import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { estudanteMensagensValidacao } from 'App/Enums/ValidatorMessages'
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class CadastrarProfessoresController {
    public async handle({ request, response }: HttpContextContract) {
        const dadosNecessarios = schema.create({
            nome: schema.string(),
            email: schema.string([rules.email()]),
            password: schema.string([rules.minLength(5), rules.confirmed()]),
        })

        const dadosRequisicao = await request.validate({
            schema: dadosNecessarios,
            messages: estudanteMensagensValidacao
        })

        const emailExiste = await Professor.findBy('email', dadosRequisicao.email)

        if (emailExiste) {
            throw new ApiErrorException('Esse email já está em uso', 400, 'E_EMAIL_EXIST')
        } else {

            const professor = await Professor.create({
                nome: dadosRequisicao.nome,
                email: dadosRequisicao.email,
                password: dadosRequisicao.password,
            })

            return response.json(professor)
        }
    }
}