import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('reviewer').title('Reviewer'),
      S.documentTypeListItem('thought').title('Thoughts'),
      S.documentTypeListItem('author').title('author'),
    ])
