import { memo } from 'react';
import { Handle, Position, NodeResizer, useStore } from 'reactflow';
import { useTranslation } from 'react-i18next';
import styles from './Node.module.scss';
import classNames from 'classnames/bind';
import Node, { contentStyle as style } from './Node';
import uuid from 'react-uuid';

const cn = classNames.bind(styles);

interface UseNodeProps {
  id: string;
  data: {
    label: string;
  };
  selected: boolean;
}

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

const UseNode = ({ id, data, selected }: UseNodeProps) => {
  const { t } = useTranslation();

  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isTarget = connectionNodeId && connectionNodeId !== id;

  return (
    <>
      <NodeResizer
        color="#2b872b"
        isVisible={selected}
        minWidth={120}
        minHeight={100}
      />
      <Node
        label={t('process.use')}
        selected={selected}
        color={'#2b872b'}
        content={
          <div className={cn('io')}>
            {data.label}
            {!isTarget && (
              <Handle
                style={{ ...style.handle, ...style.right }}
                position={Position.Right}
                type="source"
              />
            )}
            <Handle
              style={{ ...style.handle, ...style.left }}
              position={Position.Left}
              type="target"
            />
          </div>
        }
      />
    </>
  );
};

export default memo(UseNode);
