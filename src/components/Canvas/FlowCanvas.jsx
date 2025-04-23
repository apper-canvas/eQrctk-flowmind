import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useFlowStore } from '../../store/flowStore';
import { nodeTypes } from './NodeTypes';

const FlowCanvas = () => {
  const { 
    nodes, 
    edges, 
    setSelectedNode, 
    updateNodePosition,
    addEdge,
    deleteEdge,
    clearSelection
  } = useFlowStore();
  
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Setup ReactFlow instance
  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  // Handle node drag stop to update positions
  const onNodeDragStop = useCallback((event, node) => {
    updateNodePosition(node.id, node.position);
  }, [updateNodePosition]);

  // Handle edge creation
  const onConnect = useCallback((params) => {
    addEdge(params);
  }, [addEdge]);

  // Handle edge removal
  const onEdgeDelete = useCallback((edge) => {
    deleteEdge(edge.id);
  }, [deleteEdge]);

  // Handle pane click to clear selection
  const onPaneClick = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  // Handle new node being dropped onto the canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));

      // Check if the data exists and has a type
      if (!nodeData || !nodeData.type) {
        return;
      }

      // Calculate the position where the node is dropped
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Create the new node with the position
      const newNode = {
        ...nodeData,
        position,
      };

      // Add the node to the flow
      useFlowStore.getState().addNode(newNode);
    },
    [reactFlowInstance]
  );

  // Handle drag over for dropping nodes
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <ReactFlowProvider>
      <div 
        ref={reactFlowWrapper} 
        className="flex-grow h-full"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={() => {}}
          onEdgesChange={() => {}}
          onConnect={onConnect}
          onEdgeDelete={onEdgeDelete}
          onNodeClick={onNodeClick}
          onNodeDragStop={onNodeDragStop}
          onPaneClick={onPaneClick}
          onInit={onInit}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid={true}
          snapGrid={[15, 15]}
          defaultZoom={1}
        >
          <Background color="#aaa" gap={16} size={1} />
          <Controls />
          <MiniMap
            nodeStrokeColor={(node) => {
              switch (node.data.type) {
                case 'trigger':
                  return '#f97316';
                case 'action':
                case 'app':
                  return '#10b981';
                case 'logic':
                  return '#8b5cf6';
                case 'ai':
                  return '#ef4444';
                default:
                  return '#64748b';
              }
            }}
            nodeColor={(node) => {
              switch (node.data.type) {
                case 'trigger':
                  return '#ffedd5';
                case 'action':
                case 'app':
                  return '#d1fae5';
                case 'logic':
                  return '#ede9fe';
                case 'ai':
                  return '#fee2e2';
                default:
                  return '#f1f5f9';
              }
            }}
            nodeBorderRadius={4}
          />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowCanvas;