import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import styles from './ContextMenu.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const onPaneContextMenu = ({ id, top, left, right, bottom, ...props }: any) => {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className={cn('context-menu')}
      {...props}
    >
      <button onClick={deleteNode}>Delete</button>
    </div>
  );
};

export default onPaneContextMenu;
