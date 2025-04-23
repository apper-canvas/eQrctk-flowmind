import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useFlowStore } from '../../store/flowStore';

// Node types
import DefaultNode from './Nodes/DefaultNode';

// Define custom node types
const nodeTypes = {
  default: DefaultNode,
  trigger: DefaultNode,
  action: DefaultNode,
  logic: DefaultNode,
  ai: DefaultNode,
  app: DefaultNode,
  data: DefaultNode,
};

const FlowCanvas = () => {
  const { 
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    addNode
  } = useFlowStore();
  
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const category = event.dataTransfer.getData('category');
      
      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Get position from drop coordinates
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      addNode(type, category, position);
    },
    [reactFlowInstance, addNode]
  );

  return (
    <ReactFlowProvider>
      <div className="h-full w-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
          minZoom={0.1}
          maxZoom={4}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          connectionLineStyle={{ stroke: '#60a5fa', strokeWidth: 2 }}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={16} />
          <Controls />
          <MiniMap 
            nodeStrokeColor={(n) => {
              if (n.type === 'trigger') return '#ff0072';
              if (n.type === 'action') return '#1a192b';
              if (n.type === 'logic') return '#ff9900';
              if (n.type === 'ai') return '#7b2cbf';
              return '#eee';
            }}
            nodeColor={(n) => {
              if (n.type === 'trigger') return '#ffb3d1';
              if (n.type === 'action') return '#c5d5f0';
              if (n.type === 'logic') return '#ffe0b2';
              if (n.type === 'ai') return '#d8c2f3';
              return '#fff';
            }}
            maskColor="#f8fafc50"
          />
          <Panel position="top-left" className="bg-white dark:bg-slate-800 p-2 rounded shadow">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              Drag nodes from the sidebar to the canvas
            </h3>
          </Panel>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowCanvas;