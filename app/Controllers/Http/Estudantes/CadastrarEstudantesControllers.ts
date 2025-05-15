import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'
import Usuario from 'App/Models/Usuario'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { estudanteMensagensValidacao } from 'App/Enums/ValidatorMessages'
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class CadastrarEstudantesController {
    public async handle({ request, response, params }: HttpContextContract) {
        const dadosNecessarios = schema.create({
            nome: schema.string([]),
            email: schema.string([rules.email()]),
            password: schema.string([rules.minLength(5), rules.confirmed()]),
            tipo: schema.enum(['ESTUDANTE']),
            ra: schema.string([rules.maxLength(13)]),
            telefone: schema.string([rules.maxLength(11)]),
            endereco: schema.string([]),
        })

        const dadosRequisicao = await request.validate({
            schema: dadosNecessarios,
            messages: estudanteMensagensValidacao
        })

        const emailExiste = await Usuario.findBy('email', dadosRequisicao.email)

        if (emailExiste) {
            throw new ApiErrorException('Esse email já está em uso', 400, 'E_EMAIL_EXIST')
        }
        const trx = await Database.transaction()

        try {
            const usuario = await Usuario.create({
                email: dadosRequisicao.email,
                password: dadosRequisicao.password,
                tipo: dadosRequisicao.tipo,
            }, { client: trx })

            const estudante = await Estudante.create({
                nome: dadosRequisicao.nome,
                ra: dadosRequisicao.ra,
                telefone: dadosRequisicao.telefone,
                endereco: dadosRequisicao.endereco,
                usuario_id: usuario.id
            }, { client: trx })

            await trx.commit()
            return response.json({ usuario, estudante })
        } catch (error) {
            console.error('Erro ao criar usuário e estudante:', error)
            await trx.rollback()
            throw new ApiErrorException('Erro ao criar usuário e estudante', 500, 'E_USUARIO_ESTUDANTE_CREATE')
        }
    }
}