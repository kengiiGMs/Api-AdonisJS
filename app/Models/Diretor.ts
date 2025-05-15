import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'

export default class Diretor extends BaseModel {
  public static table = 'diretores'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public usuario_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Usuario, {
    foreignKey: 'usuario_id',
  })

  public usuario: BelongsTo<typeof Usuario>
}
