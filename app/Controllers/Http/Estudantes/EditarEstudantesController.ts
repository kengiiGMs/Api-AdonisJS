import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { estudanteMensagensValidacao } from 'App/Enums/ValidatorMessages'
import ApiErrorException from 'App/Exceptions/ApiErrorException'
import Hash from '@ioc:Adonis/Core/Hash'

export default class EditarEstudantesController {
    public async handle({ request, response, params }: HttpContextContract) {
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

        const estudanteId = Number(params.estudante_id)

        if (!estudanteId) {
            throw new ApiErrorException('Id não encontrado na url', 404, 'E_ID_NO_EXIST')
        }

        const estudanteExiste = await Estudante.findBy('id', estudanteId)

        if (!estudanteExiste) {
            throw new ApiErrorException('Estudante não encontrado', 404, 'E_ESTUDANTE_NO_EXIST')
        }

        if (estudanteExiste.email !== dadosRequisicao.email) {
            const emailExiste = await Estudante.findBy('email', dadosRequisicao.email);

            if (emailExiste) {
                throw new ApiErrorException('Esse email já está em uso', 400, 'E_EMAIL_EXIST')
            }
        }

        dadosRequisicao.password = await Hash.make(dadosRequisicao.password)

        await Estudante.query().where('id', estudanteId).update(dadosRequisicao)
        return response.json({ message: 'Estudante editado com sucesso' })
    }
}