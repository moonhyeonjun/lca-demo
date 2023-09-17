import { useTranslation } from 'react-i18next';

export const getMenuItems = () => {
  const { t } = useTranslation();
  const menuItems = [
    {
      title: t('nav.file'),
      submenu: [
        {
          title: t('nav.new-file'),
          url: 'new-file',
        },
        {
          title: t('nav.open'),
          url: 'open',
        },
        {
          title: t('nav.save'),
          url: 'save',
        },
        {
          title: t('nav.save-as'),
          url: 'save-as',
        },
        {
          title: t('nav.example-file'),
          url: 'example-file',
        },
        {
          title: t('nav.close-project'),
          url: 'close-project',
        },
        {
          title: t('nav.project-info'),
          url: 'project-info',
        },
        {
          title: t('nav.print'),
          url: 'print',
        },
        {
          title: t('nav.print-settings'),
          url: 'print-settings',
        },
        {
          title: t('nav.preview'),
          url: 'preview',
        },
        {
          title: t('nav.recent-files'),
          url: 'recent-files',
        },
        {
          title: t('nav.exit'),
          url: 'exit',
        },
      ],
    },
    {
      title: t('nav.edit'),
      submenu: [
        {
          title: t('nav.add-process'),
          url: 'add-process',
        },
        {
          title: t('nav.edit-process'),
          url: 'edit-process',
        },
        {
          title: t('nav.add-transport'),
          url: 'add-transport',
        },
        {
          title: t('nav.edit-transport'),
          url: 'edit-transport',
        },
        {
          title: t('nav.select-all'),
          url: 'select-all',
        },
        {
          title: t('nav.cut'),
          url: 'cut',
        },
        {
          title: t('nav.copy'),
          url: 'copy',
        },
        {
          title: t('nav.paste'),
          url: 'paste',
        },
        {
          title: t('nav.import-excel'),
          url: 'import-excel',
        },
        {
          title: t('nav.import-data'),
          url: 'import-data',
        },
        {
          title: t('nav.import-ecoinvent'),
          url: 'import-ecoinvent',
        },
        {
          title: t('nav.export-excel'),
          url: 'export-excel',
        },
        {
          title: t('nav.edit-iso14048'),
          url: 'edit-iso14048',
        },
      ],
    },
    {
      title: t('nav.tools'),
      submenu: [
        {
          title: t('nav.edit-material-db'),
          url: 'edit-material-db',
        },
        {
          title: t('nav.all-materials-list'),
          url: 'all-materials-list',
        },
        {
          title: t('nav.edit-impact-factors'),
          url: 'edit-impact-factors',
        },
        {
          title: t('nav.edit-water-consumption'),
          url: 'edit-water-consumption',
        },
        {
          title: t('nav.eco-invent-impact-assessment'),
          url: 'eco-invent-impact-assessment',
        },
        {
          title: t('nav.eco-invent-water-footprint-assessment'),
          url: 'eco-invent-water-footprint-assessment',
        },
        {
          title: t('nav.project-data-check'),
          url: 'project-data-check',
        },
        {
          title: t('nav.db-manager'),
          url: 'db-manager',
        },
        {
          title: t('nav.db-search'),
          url: 'db-search',
        },
        {
          title: t('nav.settings'),
          url: 'settings',
        },
      ],
    },
    {
      title: t('nav.calculation'),
      submenu: [
        {
          title: t('nav.reference-material'),
          url: 'reference-material',
        },
        {
          title: t('nav.perform-calculation'),
          url: 'perform-calculation',
        },
        {
          title: t('nav.water-footprint'),
          url: 'water-footprint',
        },
        {
          title: t('nav.list-analysis'),
          url: 'list-analysis',
        },
        {
          title: t('nav.impact-assessment'),
          url: 'impact-assessment',
        },
      ],
    },
    {
      title: t('nav.help'),
      submenu: [
        {
          title: t('nav.help'),
          url: 'help',
        },
        {
          title: t('nav.update-history'),
          url: 'update-history',
        },
        {
          title: t('nav.total-info'),
          url: 'total-info',
        },
      ],
    },
  ];

  return menuItems;
};
