import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useFlowStore } from '../../store/flowStore';
import DefaultNode from './Nodes/DefaultNode';

// Define node types
const nodeTypes = {
  default: DefaultNode,
};

const FlowCanvas = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
  } = useFlowStore();

  // Handle node click to update the selected node in the store
  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  // Handle background click to deselect nodes
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return (
    <div className="h-full w-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={4}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        proOptions={{ hideAttribution: true }}
        className="bg-gradient-to-b from-gray-50 to-gray-100"
      >
        <Background color="#aaa" gap={16} size={1} />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <div className="bg-white p-2 rounded shadow-md text-xs">
            <div>Double-click to add a node</div>
            <div>Drag between ports to connect</div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;