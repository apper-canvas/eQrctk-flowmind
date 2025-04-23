import { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useFlowStore } from '../../store/flowStore';
import { nodeTypes } from './NodeTypes';
import { Plus, Minus, Maximize, Grid } from 'lucide-react';

const FlowCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    addNode,
    setSelectedNode,
  } = useFlowStore();
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  // Handle node drag when dropped from the sidebar
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const category = event.dataTransfer.getData('nodeCategory');
      
      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      addNode(type, category, position);
    },
    [addNode]
  );

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    onNodeClick(event, node);
  };

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <Controls />
        <MiniMap
          nodeStrokeColor={(n) => {
            return n.style?.stroke || '#ddd';
          }}
          nodeBorderRadius={2}
        />
        <Background 
          variant="dots" 
          gap={12} 
          size={1} 
          color="#a9b8c9" 
          style={{ backgroundColor: 'transparent' }}
        />
        <Panel position="top-right" className="bg-white dark:bg-slate-800 p-2 rounded-md shadow-md space-y-2">
          <button
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={() => zoomIn({ duration: 300 })}
          >
            <Plus size={18} />
          </button>
          <button
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={() => zoomOut({ duration: 300 })}
          >
            <Minus size={18} />
          </button>
          <button
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={() => fitView({ duration: 300 })}
          >
            <Maximize size={18} />
          </button>
          <button
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Grid size={18} />
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;