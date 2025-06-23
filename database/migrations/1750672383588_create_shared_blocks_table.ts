import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'shared_blocks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('block_id').unsigned().references('id').inTable('blocks').onDelete('CASCADE')
      table.integer('shared_with_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['block_id', 'shared_with_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}