import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'professores'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome', 70).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()

      /**
     * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
     */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
