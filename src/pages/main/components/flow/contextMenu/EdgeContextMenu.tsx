import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import styles from './ContextMenu.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const EdgeContextMenu = ({ id, top, left, right, bottom, ...props }: any) => {
  const { getEdge, addEdges, setEdges } = useReactFlow();

  const deleteEdge = useCallback(
    () => setEdges((edges: any) => edges.filter((edge: any) => edge.id !== id)),
    [id, setEdges],
  );

  return (
    <div
      style={{ top, left, right, bottom }}
      className={cn('context-menu')}
      {...props}
    >
      <p style={{ margin: '0.5em' }}>
        <small>Edge: {id}</small>
      </p>
      <button onClick={deleteEdge}>Delete</button>
    </div>
  );
};

export default EdgeContextMenu;
