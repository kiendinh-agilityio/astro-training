import {
  type StructureBuilder,
  type StructureResolver,
} from 'sanity/structure';

const SETTINGS_SINGLETONS = [
  { id: 'siteSettings', title: 'Metadata' },
  { id: 'mainNavigation', title: 'Main Navigation' },
];

export const blogStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items(
              SETTINGS_SINGLETONS.map(({ id, title }) =>
                S.listItem()
                  .title(title)
                  .child(S.document().schemaType(id).documentId(id)),
              ),
            ),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SETTINGS_SINGLETONS.some(
            (settingsItem) => settingsItem.id === listItem.getId(),
          ),
      ),
    ]);
