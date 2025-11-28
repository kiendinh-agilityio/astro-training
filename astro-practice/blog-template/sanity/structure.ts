const SETTINGS_SINGLETONS = [
  { id: 'siteSettings', title: 'Metadata' },
  { id: 'mainNavigation', title: 'Main Navigation' },
];

export const blogStructure = (S: {
  list: () => {
    title: (title: string) => {
      items: (items: unknown[]) => unknown;
    };
  };
  listItem: () => {
    title: (title: string) => {
      child: (child: unknown) => unknown;
    };
  };
  document: () => {
    schemaType: (type: string) => {
      documentId: (id: string) => unknown;
    };
  };
  documentTypeList: (type: string) => {
    title: (title: string) => unknown;
  };
  documentTypeListItems: () => Array<{
    getId: () => string | null;
  }>;
}) =>
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
      S.listItem()
        .title('Blog Post')
        .child(
          S.list()
            .title('Blog Post')
            .items([
              S.listItem()
                .title('Blog Post Header')
                .child(
                  S.document()
                    .schemaType('blogSectionSettings')
                    .documentId('blogSectionSettings'),
                ),
              S.listItem()
                .title('Blog Post Content')
                .child(S.documentTypeList('blogPost').title('Posts')),
            ]),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SETTINGS_SINGLETONS.some(
            (settingsItem) => settingsItem.id === listItem.getId(),
          ) &&
          listItem.getId() !== 'blogPost' &&
          listItem.getId() !== 'blogSectionSettings',
      ),
    ]);
