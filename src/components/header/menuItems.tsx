import { useTranslation } from 'react-i18next';
import { FaBeer } from 'react-icons/fa';

export const getMenuItems = () => {
  const { t } = useTranslation();
  const menuItems = [
    {
      title: t('nav.file'),
      submenu: [
        {
          title: t('nav.new-file'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.open'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.save'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.save-as'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.example-file'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.close-project'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.project-info'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.print'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.print-settings'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.preview'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.recent-files'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.exit'),
          icon: <FaBeer />,
        },
      ],
    },
    {
      title: t('nav.edit'),
      submenu: [
        {
          title: t('nav.add-process'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.edit-process'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.add-transport'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.edit-transport'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.select-all'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.cut'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.copy'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.paste'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.import-excel'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.import-data'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.import-ecoinvent'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.export-excel'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.edit-iso14048'),
          icon: <FaBeer />,
        },
      ],
    },
    {
      title: t('nav.tools'),
      submenu: [
        {
          title: t('nav.edit-material-db'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.all-materials-list'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.edit-impact-factors'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.edit-water-consumption'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.eco-invent-impact-assessment'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.project-data-check'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.db-manager'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.db-search'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.settings'),
          icon: <FaBeer />,
        },
      ],
    },
    {
      title: t('nav.calculation'),
      submenu: [
        {
          title: t('nav.standard-material'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.perform-calculation'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.water-footprint'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.list-analysis'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.impact-assessment'),
          icon: <FaBeer />,
        },
      ],
    },
    {
      title: t('nav.help'),
      submenu: [
        {
          title: t('nav.help'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.update-history'),
          icon: <FaBeer />,
        },
        {
          title: t('nav.total-info'),
          icon: <FaBeer />,
        },
      ],
    },
  ];

  return menuItems;
};
