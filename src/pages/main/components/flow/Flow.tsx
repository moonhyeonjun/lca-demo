import { useState, useEffect, useCallback, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  updateEdge,
  addEdge,
  Node,
  Edge,
  Panel,
  MarkerType,
} from 'reactflow';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveData, addData, deleteData } from 'store/reducer/data';
import { Modal, Input, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { initNodes, initEdges } from 'pages/main/initData';
import { VscSplitHorizontal } from 'react-icons/vsc';
import { RxViewHorizontal } from 'react-icons/rx';

import DisposeNode from './nodeTypes/DisposeNode';
import PreManufacturingNode from './nodeTypes/PreManufacturingNode';
import ManufacturingNode from './nodeTypes/ManufacturingNode';
import UseNode from './nodeTypes/UseNode';
import NodeContextMenu from './contextMenu/NodeContextMenu';
import EdgeContextMenu from './contextMenu/EdgeContextMenu';
import PaneContextMenu from './contextMenu/PaneContextMenu';
import DndSection from 'pages/main/components/flow/DndSection';
import styles from './Flow.module.scss';
import classNames from 'classnames/bind';
import uuid from 'react-uuid';
import dagre from 'dagre';

import 'reactflow/dist/style.css';
import ShortCut from 'pages/main/components/shortCut';

const cn = classNames.bind(styles);

enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots',
  Cross = 'cross',
}

const nodeTypes = {
  dispose: DisposeNode,
  preManufacturing: PreManufacturingNode,
  manufacturing: ManufacturingNode,
  use: UseNode,
};

// const edgeTypes = {
//   custom: CustomEdge,
//   floating: FloatingEdge,
// };

const initialNodes: Node<any, string | undefined>[] = [];
const initialEdges: Edge<any>[] = [];

// const initialNodes = [
//   {
//     id: '1',
//     type: 'CustomNode',
//     data: { label: 'Custom Resize Icon', select: 'smoothstep' },
//     position: { x: 150, y: 150 },
//     style: {
//       background: '#fff',
//       fontSize: 12,
//       border: '1px solid black',
//       padding: 5,
//       borderRadius: 15,
//       height: 50,
//     },
//   },
//   {
//     id: '2',
//     type: 'CustomNode',
//     data: {
//       label: 'Custom Resize Icon',
//       select: 'smoothstep',
//     },
//     position: { x: 150, y: 400 },
//     style: {
//       background: '#fff',
//       fontSize: 12,
//       border: '1px solid black',
//       padding: 5,
//       borderRadius: 15,
//       height: 50,
//     },
//   },
// ];

// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 120;
const nodeHeight = 100;

const getLayoutedElements = (nodes: any, edges: any, direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node: any) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge: any) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: any) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

const connectionLineStyle = {
  strokeWidth: 1,
  stroke: '#808080',
};

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: '#808080' },
  type: 'smoothstep',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#808080',
  },
};

const Flow = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const flowWrapperRef = useRef<any>(null);
  const flowRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [NodeMenu, setNodeMenu] = useState<any>(null);
  const [edgeMenu, setEdgeMenu] = useState<any>(null);
  const [paneMenu, setPaneMenu] = useState<any>(null);

  useEffect(() => {
    setNodes(initNodes);
    setEdges(initEdges);
    // setNodes([]);
    // setEdges([]);
    getLayoutedElements(initNodes, initEdges);
    const data = initNodes.map((node) => ({
      id: node.id,
      data: node.data.label,
    }));
    dispatch(saveData(data));
  }, []);

  const onLayout = useCallback(
    (direction: any) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges],
  );

  const onEdgeUpdate = useCallback(
    (oldEdge: any, newConnection: any) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    [],
  );

  const onConnect = useCallback(
    (params: any) => createEdge(params),
    [setEdges],
  );

  const onNodesDelete = useCallback(
    (nodesToDelete: any) => {
      setNodes((els) => els.filter((n: any) => !nodesToDelete.includes(n.id)));
      setEdges((els) =>
        els.filter((e: any) => !nodesToDelete.includes(e.source)),
      );
      const nodeId = nodesToDelete[0].id;
      dispatch(deleteData(nodeId));
    },
    [setNodes, setEdges],
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = flowWrapperRef.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      openModal(type, position);
    },
    [reactFlowInstance],
  );

  const onNodeCilick = useCallback(
    (event: any, node: any) => {
      // console.log('node click', node);
    },
    [setNodeMenu],
  );

  const onNodeContextMenu = useCallback(
    (event: any, node: any) => {
      event.preventDefault();
      resetMenu();
      if (!flowRef.current) return;
      const pane = flowRef.current.getBoundingClientRect();
      setNodeMenu({
        id: node.id,
        top: event.clientY - pane.top,
        left: event.clientX - pane.left,
        right: pane.width - event.clientX - 50,
        bottom: pane.height - event.clientY - 50,
      });
    },
    [setNodeMenu],
  );

  const onEdgeContextMenu = useCallback(
    (event: any, edge: any) => {
      event.preventDefault();
      resetMenu();
      if (!flowRef.current) return;
      const pane = flowRef.current.getBoundingClientRect();
      setEdgeMenu({
        id: edge.id,
        top: event.clientY - pane.top,
        left: event.clientX - pane.left,
        right: pane.width - event.clientX - 50,
        bottom: pane.height - event.clientY - 50,
      });
    },
    [setEdgeMenu],
  );

  const onPaneContextMenu = useCallback(
    (event: any) => {
      event.preventDefault();
      resetMenu();
      if (!flowRef.current) return;
      const pane = flowRef.current.getBoundingClientRect();
      setPaneMenu({
        top: event.clientY - pane.top,
        left: event.clientX - pane.left,
        right: pane.width - event.clientX - 50,
        bottom: pane.height - event.clientY - 50,
      });
    },
    [setPaneMenu],
  );

  const onPaneClick = useCallback(() => {
    resetMenu();
  }, [setNodeMenu, setEdgeMenu, setPaneMenu]);

  const openModal = (type: string, position: any) => {
    let data = '';

    if (inputRef.current) {
      inputRef.current.focus?.({
        cursor: 'start',
      });
    }

    Modal.confirm({
      title: '',
      content: (
        <Input
          ref={inputRef}
          type="text"
          onChange={(e) => (data = e.target.value)}
          placeholder={t('modal.create-node-placeholder')}
        />
      ),
      okText: t('modal.ok'),
      cancelText: t('modal.cancel'),
      onOk() {
        createNode(type, position, data);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const resetMenu = () =>
    new Promise((resolve) => {
      setNodeMenu(null);
      setEdgeMenu(null);
      setPaneMenu(null);
      resolve(true);
    });

  const createNode = (type: string, position: any, data: string) => {
    const newNode = {
      id: `${data}-${uuid()}`,
      type,
      position,
      data: {
        label: data,
      },
      style: {
        width: 120,
        height: 100,
      },
    };

    dispatch(addData({ id: newNode.id, data: newNode.data.label }));
    setNodes((nds) => nds.concat(newNode));
  };

  const createEdge = (params: any) => {
    if (params.source === params.target) {
      return;
    }
    setEdges((eds) => {
      const newEdge = {
        id: uuid(),
        source: params.source,
        target: params.target,
        style: {
          strokeWidth: 1,
          stroke: '#808080',
        },
        type: 'smoothstep',
        label: 'Click',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#808080',
        },
      };

      return addEdge(newEdge, eds);
    });
  };

  // node를 더블 클릭하면 해당 노드의 정보를 가져옵니다.
  const onNodeDoubleClick = (event: any, node: any) => {
    // /process/:id로 이동
    navigate(`/process/${node.data?.label}`);
  };

  // edge를 더블 클릭하면 해당 edge의 정보를 가져옵니다.
  const onEdgeDoubleClick = (event: any, edge: any) => {
    console.log('edge', edge);
  };

  const nodeColor = (node: any) => {
    switch (node.type) {
      case 'preManufacturing':
        return '#808080';
      case 'manufacturing':
        return '#0041d0';
      case 'use':
        return '#2b872b';
      case 'dispose':
        return '#ff0072';
      default:
        return '#eee';
    }
  };

  return (
    <div className={cn('dndflow')}>
      <div className={cn('reactflow-wrapper')} ref={flowWrapperRef}>
        <ShortCut />
        <ReactFlow
          ref={flowRef}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeCilick}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          onEdgeUpdate={onEdgeUpdate}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onEdgeContextMenu}
          onPaneContextMenu={onPaneContextMenu}
          onNodesDelete={onNodesDelete}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          // edgeTypes={edgeTypes}
          onInit={setReactFlowInstance}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineStyle={connectionLineStyle}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          // connectionLineType={ConnectionLineType.SmoothStep} // Helper lines를 사용할 때 연결 라인의 타입 설정
          // snapToGrid={true} // Grid에 자동으로 스냅됩니다.
          // snapGrid={[16, 16]} // Grid 크기 설정
        >
          <Panel className={cn('panel')} position="top-right">
            <button onClick={() => onLayout('TB')}>
              <Tooltip title={t('button.vertical-align')}>
                <RxViewHorizontal />
              </Tooltip>
            </button>
            <button onClick={() => onLayout('LR')}>
              <Tooltip title={t('button.horizontal-align')}>
                <VscSplitHorizontal />
              </Tooltip>
            </button>
          </Panel>
          <Controls />
          <MiniMap nodeColor={nodeColor} />
          <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
          {NodeMenu && <NodeContextMenu onClick={onPaneClick} {...NodeMenu} />}
          {edgeMenu && <EdgeContextMenu onClick={onPaneClick} {...edgeMenu} />}
          {paneMenu && <PaneContextMenu onClick={onPaneClick} {...paneMenu} />}
        </ReactFlow>
      </div>
      <DndSection />
    </div>
  );
};

export default Flow;
