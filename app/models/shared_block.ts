import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from '#models/user'
import Block from '#models/block'

export default class SharedBlock extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare blockId: number

  @column()
  declare sharedWithId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  
  @belongsTo(() => Block)
  declare block: BelongsTo<typeof Block>

  @belongsTo(() => User, {
    foreignKey: 'sharedWithId',
  })
  declare sharedWith: BelongsTo<typeof User>
}