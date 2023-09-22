import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGavel,
  faIndustry,
  faTruck,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './DndSection.module.scss';

const cn = classNames.bind(styles);

const DndNode = ({ t, nodeType, color, icon }: any) => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={cn('dndnode', nodeType)}
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
    >
      <Tooltip title={t(`process.${nodeType}`)} placement="right" color={color}>
        <div>
          <FontAwesomeIcon icon={icon} color={color} size="lg" />
        </div>
      </Tooltip>
    </div>
  );
};

const DndSection = () => {
  const { t } = useTranslation();

  const nodeTypes = [
    { type: 'preManufacturing', color: '#808080', icon: faGavel },
    { type: 'manufacturing', color: '#0041d0', icon: faIndustry },
    { type: 'use', color: '#2b872b', icon: faTruck },
    { type: 'dispose', color: '#ff0072', icon: faTrashCan },
  ];

  return (
    <aside>
      {nodeTypes.map(({ type, color, icon }) => (
        <DndNode key={type} t={t} nodeType={type} color={color} icon={icon} />
      ))}
    </aside>
  );
};

export default DndSection;
