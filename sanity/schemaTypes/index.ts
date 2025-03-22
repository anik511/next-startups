import { type SchemaTypeDefinition } from 'sanity'
import { reviewer } from './reviewer'
import { thought } from './thought'
import { author } from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [reviewer, thought, author],
}
