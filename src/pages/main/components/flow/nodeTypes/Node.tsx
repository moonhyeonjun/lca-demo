import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Node.module.scss';

const cn = classNames.bind(styles);

export const contentStyle = {
  contentHeader: {
    padding: '8px 0px',
    flexGrow: 1,
    backgroundColor: '#eee',
  },
  io: {
    position: 'relative',
    padding: '8px 16px',
    flexGrow: 1,
  },
  left: { left: '-3px' },
  textLeft: { textAlign: 'left' },
  right: { right: '-3px' },
  textRight: { textAlign: 'right' },
  handle: {
    margin: 'auto',
    background: '#eee',
    borderRadius: '50%',
    border: '1px solid #dfdfdf',
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px',
  },
};

const style = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    border: '0px solid #bbb',
    fontSize: '10pt',
  },
  selected: {
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
  title: {
    position: 'relative',
    padding: '8px 0',
    flexGrow: 1,
    textAlign: 'center',
    backgroundColor: '#eee',
    color: '#fff',
    fontSize: '10px',
    borderRadius: '8px 8px 0px 0px',
  },
  contentWrapper: {
    padding: '8px 0px',
  },
};

interface NodeProps {
  label: string;
  selected: boolean;
  color?: string;
  content: React.ReactNode;
}

const Node: React.FC<NodeProps> = ({
  label,
  selected,
  color,
  content,
}: NodeProps) => {
  const customTitle = { ...style.title } as React.CSSProperties;

  if (color) customTitle.backgroundColor = color;

  return (
    <div className={cn('body', selected ? 'selected' : '')}>
      <div style={customTitle}>{label}</div>
      <div className={cn('content-wrapper')}>{content}</div>
    </div>
  );
};

export default memo(Node);
