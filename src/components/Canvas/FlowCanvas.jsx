import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useFlowStore } from '../../store/flowStore';
import DefaultNode from './Nodes/DefaultNode';

const nodeTypes = {
  default: DefaultNode,
};

const FlowCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addEdge,
    addNode,
  } = useFlowStore();
  
  const onConnect = useCallback((params) => {
    addEdge(params);
  }, [addEdge]);
  
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      // Check if we have data
      const nodeData = event.dataTransfer.getData('application/reactflow');
      
      if (!nodeData) return;
      
      try {
        const data = JSON.parse(nodeData);
        
        // Get the position of the drop
        const position = {
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        };
        
        // Add the node
        addNode(data, position);
      } catch (error) {
        console.error('Error adding node:', error);
      }
    },
    [addNode]
  );

  return (
    <div 
      className="h-full w-full"
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <div className="p-2 bg-white rounded shadow">
            <button 
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              onClick={() => useFlowStore.getState().clearCanvas()}
            >
              Clear Canvas
            </button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

// Wrap the component with ReactFlowProvider to fix the zustand provider error
const FlowCanvasWithProvider = () => (
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);

export default FlowCanvasWithProvider;