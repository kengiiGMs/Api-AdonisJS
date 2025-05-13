import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Diretor from 'App/Models/Diretor'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { diretorMensagensValidacao } from 'App/Enums/ValidatorMessages'
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class CadastrarDiretoresController {
    public async handle({ request, response }: HttpContextContract) {
        const dadosNecessarios = schema.create({
            nome: schema.string(),
            email: schema.string([rules.email()]),
            password: schema.string([rules.minLength(5), rules.confirmed()])
        })

        const dadosRequisicao = await request.validate({
            schema: dadosNecessarios,
            messages: diretorMensagensValidacao
        })

        const emailExiste = await Diretor.findBy('email', dadosRequisicao.email)

        if (emailExiste) {
            throw new ApiErrorException('Esse email já está em uso', 400, 'E_EMAIL_EXIST')
        } else {

            const diretor = await Diretor.create({
                nome: dadosRequisicao.nome,
                email: dadosRequisicao.email,
                password: dadosRequisicao.password,
            })

            return response.json(diretor)
        }

    }
}