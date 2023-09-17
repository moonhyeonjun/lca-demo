import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './DndSection.module.scss';

const cn = classNames.bind(styles);

const DndSection = () => {
  const { t } = useTranslation();

  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div
        className={cn('dndnode', 'pre-manufacturing')}
        onDragStart={(event) => onDragStart(event, 'preManufacturing')}
        draggable
      >
        {t('process.pre-manufacturing')}
      </div>
      <div
        className={cn('dndnode', 'manufacturing')}
        onDragStart={(event) => onDragStart(event, 'manufacturing')}
        draggable
      >
        {t('process.manufacturing')}
      </div>
      <div
        className={cn('dndnode', 'use')}
        onDragStart={(event) => onDragStart(event, 'use')}
        draggable
      >
        {t('process.use')}
      </div>
      <div
        className={cn('dndnode', 'dispose')}
        onDragStart={(event) => onDragStart(event, 'dispose')}
        draggable
      >
        {t('process.dispose')}
      </div>
    </aside>
  );
};

export default DndSection;
