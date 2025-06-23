import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'

import { Roles } from '../enum/Role.js'

import Block from '#models/block'
import SharedBlock from '#models/shared_block'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  @column()
  declare role: Roles.CLIENT | Roles.ADMIN

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Block)
  declare blocks: HasMany<typeof Block>

  @hasMany(() => SharedBlock, { foreignKey: 'sharedWithId' })
  declare sharedBlocks: HasMany<typeof SharedBlock>
}