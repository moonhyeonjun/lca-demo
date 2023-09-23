import React, { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useReactFlow } from 'reactflow';
import { Tree } from 'antd';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import uuid from 'react-uuid';

const cn = classNames.bind(styles);

import type { DataNode, TreeProps } from 'antd/es/tree';

const TreeNode: React.FC = () => {
  const { data } = useSelector((state: any) => state.data);
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    const root = {
      key: uuid(),
      title: 'LCA',
    };

    const children = data.map((item: any) => {
      return {
        key: item.id,
        title: item.data,
      };
    });

    const treeData = [
      {
        key: root.key,
        title: root.title,
        children,
      },
    ];
    setTreeData(treeData);
    setExpandedKeys([root.key, ...data.map((item: any) => item.id)]);
  }, [data]);

  const onSelect: TreeProps['onSelect'] = (selectedKeys) => {
    const nodeId = selectedKeys[0].toString();
    // 해당 노드의 div 요소를 가져온다.
    // 가져온 요소를 click한다.
    const element = document.querySelector(
      `[data-id="${nodeId}"]`,
    ) as HTMLElement;
    // console.log(element);
    if (element) {
      element.click();
    }
  };

  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandAll={false}
      onSelect={onSelect}
      treeData={treeData}
      expandedKeys={expandedKeys}
      className={cn('tree')}
    />
  );
};

export default TreeNode;
