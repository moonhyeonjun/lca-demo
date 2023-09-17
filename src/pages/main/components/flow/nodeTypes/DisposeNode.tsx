import { memo } from 'react';
import { Handle, Position, NodeResizer, useStore } from 'reactflow';
import { useTranslation } from 'react-i18next';
import styles from './Node.module.scss';
import classNames from 'classnames/bind';
import Node, { contentStyle as style } from './Node';

const cn = classNames.bind(styles);

interface DisposeNodeProps {
  id: string;
  data: {
    label: string;
  };
  selected: boolean;
}

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

const DisposeNode = ({ id, data, selected }: DisposeNodeProps) => {
  const { t } = useTranslation();

  console.log(id, data, selected);

  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isTarget = connectionNodeId && connectionNodeId !== id;

  return (
    <>
      <NodeResizer
        color="#ff0072"
        isVisible={selected}
        minWidth={120}
        minHeight={100}
      />
      <Node
        label={t('process.dispose')}
        selected={selected}
        color={'#ff0072'}
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

export default memo(DisposeNode);
