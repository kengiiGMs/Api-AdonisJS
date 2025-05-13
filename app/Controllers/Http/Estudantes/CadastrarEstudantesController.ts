import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { estudanteMensagensValidacao } from 'App/Enums/ValidatorMessages'
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class CadastrarEstudantesController {
    public async handle({ request, response }: HttpContextContract) {
        const dadosNecessarios = schema.create({
            nome: schema.string(),
            email: schema.string([rules.email()]),
            password: schema.string([rules.minLength(5), rules.confirmed()]),
            endereco: schema.string(),
            curso: schema.string(),
            telefone: schema.string(),
        })

        const dadosRequisicao = await request.validate({
            schema: dadosNecessarios,
            messages: estudanteMensagensValidacao
        })

        const emailExiste = await Estudante.findBy('email', dadosRequisicao.email)

        if (emailExiste) {
            throw new ApiErrorException('Esse email já está em uso', 400, 'E_EMAIL_EXIST')
        } else {

            const estudante = await Estudante.create({
                nome: dadosRequisicao.nome,
                email: dadosRequisicao.email,
                password: dadosRequisicao.password,
                endereco: dadosRequisicao.endereco,
                curso: dadosRequisicao.curso,
                telefone: dadosRequisicao.telefone,
            })

            return response.json(estudante)
        }

    }
}