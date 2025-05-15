import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Diretor from 'App/Models/Diretor'
import Usuario from 'App/Models/Usuario'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { diretorMensagensValidacao } from 'App/Enums/ValidatorMessages'
import ApiErrorException from 'App/Exceptions/ApiErrorException'

export default class CadastrarDiretoresController {
    public async handle({ request, response }: HttpContextContract) {
        const dadosNecessarios = schema.create({
            nome: schema.string([]),
            email: schema.string([rules.email()]),
            password: schema.string([rules.minLength(5), rules.confirmed()]),
            tipo: schema.enum(['DIRETOR']),
        })

        const dadosRequisicao = await request.validate({
            schema: dadosNecessarios,
            messages: diretorMensagensValidacao
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


            const diretor = await Diretor.create({
                nome: dadosRequisicao.nome,
                usuario_id: usuario.id
            }, { client: trx })

            await trx.commit()

            return response.json({ usuario, diretor })
        } catch (error) {
            console.error('Erro ao criar usuário e diretor:', error)
            await trx.rollback()
            throw new ApiErrorException('Erro ao criar usuário e diretor', 500, 'E_USUARIO_DIRETOR_CREATE')
        }
    }
}