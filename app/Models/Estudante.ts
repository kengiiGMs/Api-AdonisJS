import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'

export default class Estudante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public endereco: string

  @column()
  public curso: string

  @column()
  public telefone: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(estudante: Estudante) {
    if (estudante.$dirty.password) {
      estudante.password = await Hash.make(estudante.password)
    }
  }
}
