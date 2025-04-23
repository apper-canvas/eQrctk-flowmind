import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useFlowStore } from '../../store/flowStore';
import DefaultNode from './Nodes/DefaultNode';

// Define custom node types
const nodeTypes = {
  default: DefaultNode,
};

const FlowCanvas = () => {
  const { 
    nodes, 
    edges, 
    setNodes, 
    setEdges,
    addEdge: storeAddEdge,
    setSelectedNode
  } = useFlowStore();
  
  const reactFlowWrapper = useRef(null);
  
  // Handle node drag
  const onNodeDragStop = (_, node) => {
    // Update node positions in store after drag
    setNodes(
      nodes.map((n) => {
        if (n.id === node.id) {
          return node;
        }
        return n;
      })
    );
  };
  
  // Handle dropped elements from sidebar
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeType = event.dataTransfer.getData('application/reactflow/type');
      const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow/data') || '{}');
      
      // Check if the drag data contains valid node type
      if (!nodeType) {
        return;
      }
      
      // Calculate position where node was dropped
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };
      
      // Add the new node to the store
      useFlowStore.getState().addNode(nodeType, position, nodeData);
    },
    [setNodes]
  );
  
  // Allow dropping on canvas
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  // Handle connecting nodes
  const onConnect = useCallback(
    (params) => {
      storeAddEdge(params);
    },
    [storeAddEdge]
  );
  
  // Handle clicking on a node
  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  return (
    <div 
      className="h-full w-full" 
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) => {
          // Apply node changes to the local state
          const updatedNodes = [...nodes];
          changes.forEach(change => {
            if (change.type === 'position' && change.dragging === false) {
              // Find the node and update its position
              const nodeIndex = updatedNodes.findIndex(n => n.id === change.id);
              if (nodeIndex !== -1) {
                updatedNodes[nodeIndex] = {
                  ...updatedNodes[nodeIndex],
                  position: change.position
                };
              }
            }
          });
          setNodes(updatedNodes);
        }}
        onEdgesChange={(changes) => {
          // Apply edge changes
          // You might want to implement this based on your needs
        }}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDragStop={onNodeDragStop}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right" className="bg-white p-2 rounded shadow-md">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => {
              // Example: Add a test node
              useFlowStore.getState().addNode('test', { x: 100, y: 100 }, { label: 'Test' });
            }}
          >
            Add Test Node
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;