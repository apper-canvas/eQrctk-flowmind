import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  addEdge, 
  useNodesState, 
  useEdgesState 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Settings, 
  Search, 
  Plus, 
  Zap, 
  Database, 
  Workflow, 
  BrainCircuit, 
  Webhook
} from 'lucide-react';
import MainFeature from '../components/MainFeature';

// Node types
const nodeTypes = {
  trigger: ({ data }) => (
    <div className="node-trigger">
      <div className="node-header bg-orange-500 text-white">
        <span>{data.label}</span>
      </div>
      <div className="node-body">
        <div className="text-xs text-surface-500 dark:text-surface-400">{data.description}</div>
      </div>
    </div>
  ),
  action: ({ data }) => (
    <div className="node-action">
      <div className="node-header bg-blue-500 text-white">
        <span>{data.label}</span>
      </div>
      <div className="node-body">
        <div className="text-xs text-surface-500 dark:text-surface-400">{data.description}</div>
      </div>
    </div>
  ),
  logic: ({ data }) => (
    <div className="node-logic">
      <div className="node-header bg-purple-500 text-white">
        <span>{data.label}</span>
      </div>
      <div className="node-body">
        <div className="text-xs text-surface-500 dark:text-surface-400">{data.description}</div>
      </div>
    </div>
  ),
  ai: ({ data }) => (
    <div className="node-ai">
      <div className="node-header bg-green-500 text-white">
        <span>{data.label}</span>
      </div>
      <div className="node-body">
        <div className="text-xs text-surface-500 dark:text-surface-400">{data.description}</div>
      </div>
    </div>
  )
};

// Initial nodes
const initialNodes = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 100 },
    data: { 
      label: 'Webhook Trigger', 
      description: 'Starts workflow when webhook is called'
    }
  },
  {
    id: '2',
    type: 'action',
    position: { x: 250, y: 250 },
    data: { 
      label: 'HTTP Request', 
      description: 'Makes an API call to external service'
    }
  }
];

// Initial edges
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' }
];

// Node categories with examples
const nodeCategories = [
  {
    id: 'triggers',
    name: 'Triggers',
    icon: <Webhook size={18} />,
    color: 'bg-orange-500',
    nodes: [
      { id: 'webhook', label: 'Webhook', description: 'Trigger on HTTP request' },
      { id: 'cron', label: 'Cron', description: 'Schedule-based trigger' },
      { id: 'email', label: 'Email Trigger', description: 'Trigger on new email' }
    ]
  },
  {
    id: 'apps',
    name: 'Apps',
    icon: <Zap size={18} />,
    color: 'bg-blue-500',
    nodes: [
      { id: 'slack', label: 'Slack', description: 'Send messages to Slack' },
      { id: 'github', label: 'GitHub', description: 'Interact with GitHub repos' },
      { id: 'sheets', label: 'Google Sheets', description: 'Read/write spreadsheet data' }
    ]
  },
  {
    id: 'logic',
    name: 'Logic',
    icon: <Workflow size={18} />,
    color: 'bg-purple-500',
    nodes: [
      { id: 'if', label: 'IF', description: 'Conditional branching' },
      { id: 'switch', label: 'Switch', description: 'Multi-path branching' },
      { id: 'merge', label: 'Merge', description: 'Combine multiple paths' }
    ]
  },
  {
    id: 'data',
    name: 'Data',
    icon: <Database size={18} />,
    color: 'bg-yellow-500',
    nodes: [
      { id: 'http', label: 'HTTP Request', description: 'Make API calls' },
      { id: 'postgres', label: 'PostgreSQL', description: 'Query database' },
      { id: 'csv', label: 'CSV Parse', description: 'Parse CSV data' }
    ]
  },
  {
    id: 'ai',
    name: 'AI',
    icon: <BrainCircuit size={18} />,
    color: 'bg-green-500',
    nodes: [
      { id: 'llm', label: 'LLM Call', description: 'Call language model' },
      { id: 'agent', label: 'Agent Runner', description: 'Run AI agent' },
      { id: 'image', label: 'Image Gen', description: 'Generate images' }
    ]
  }
];

function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  
  const reactFlowWrapper = useRef(null);
  
  // Handle node selection
  const onNodeClick = (_, node) => {
    setSelectedNode(node);
    setInspectorOpen(true);
  };
  
  // Handle connection between nodes
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);
  
  // Handle drag and drop from sidebar
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      
      // Check if the dropped element is valid
      if (typeof nodeData === 'undefined' || !nodeData) {
        return;
      }
      
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };
      
      const newNode = {
        id: `${nodeData.id}-${Date.now()}`,
        type: nodeData.type || 'default',
        position,
        data: { 
          label: nodeData.label,
          description: nodeData.description
        },
      };
      
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );
  
  // Filter nodes based on search and category
  const filteredNodes = nodeCategories.flatMap(category => {
    if (activeCategory !== 'all' && activeCategory !== category.id) {
      return [];
    }
    
    return category.nodes.filter(node => 
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Handle node drag start from sidebar
  const onDragStart = (event, node, type) => {
    const nodeData = {
      id: node.id,
      type: type,
      label: node.label,
      description: node.description
    };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };
  
  // Toggle workflow execution
  const toggleExecution = () => {
    setIsRunning(!isRunning);
    // In a real app, this would trigger the workflow execution
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Node Library Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="sidebar w-72 flex flex-col z-10"
          >
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-lg font-semibold mb-2">Node Library</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search nodes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute left-3 top-2.5 text-surface-400" size={18} />
              </div>
            </div>
            
            <div className="flex overflow-x-auto p-2 border-b border-surface-200 dark:border-surface-700 scrollbar-hide">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1 rounded-lg mr-2 text-sm whitespace-nowrap ${
                  activeCategory === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                All
              </button>
              {nodeCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 rounded-lg mr-2 text-sm whitespace-nowrap flex items-center ${
                    activeCategory === category.id 
                      ? 'bg-primary text-white' 
                      : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                  }`}
                >
                  <span className="mr-1.5">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {nodeCategories.map(category => {
                // Skip categories that don't match the active filter
                if (activeCategory !== 'all' && activeCategory !== category.id) {
                  return null;
                }
                
                const categoryNodes = category.nodes.filter(node => 
                  node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  node.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
                
                if (categoryNodes.length === 0) {
                  return null;
                }
                
                return (
                  <div key={category.id} className="mb-6">
                    <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-2 flex items-center">
                      <span className={`w-4 h-4 rounded-sm ${category.color} mr-2`}></span>
                      {category.name}
                    </h3>
                    <div className="space-y-2">
                      {categoryNodes.map(node => (
                        <div
                          key={node.id}
                          draggable
                          onDragStart={(event) => onDragStart(event, node, category.id === 'triggers' ? 'trigger' : 
                                                             category.id === 'ai' ? 'ai' : 
                                                             category.id === 'logic' ? 'logic' : 'action')}
                          className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 cursor-move hover:shadow-card transition-shadow duration-200"
                        >
                          <div className="font-medium text-sm">{node.label}</div>
                          <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">{node.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              {filteredNodes.length === 0 && (
                <div className="text-center py-8 text-surface-500 dark:text-surface-400">
                  <p>No nodes match your search</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-surface-800 shadow-card rounded-r-lg p-1.5 border border-l-0 border-surface-200 dark:border-surface-700"
      >
        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      
      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-14 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between px-4 bg-white dark:bg-surface-800">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold mr-4">My Workflow</h1>
            <button className="btn btn-outline text-sm flex items-center">
              <Settings size={16} className="mr-1.5" />
              Settings
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className={`btn ${isRunning ? 'btn-secondary' : 'btn-primary'} text-sm flex items-center`}
              onClick={toggleExecution}
            >
              {isRunning ? (
                <>
                  <Pause size={16} className="mr-1.5" />
                  Stop
                </>
              ) : (
                <>
                  <Play size={16} className="mr-1.5" />
                  Run Workflow
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Canvas */}
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
          >
            <Background color="#aaa" gap={16} />
            <Controls />
            {showMiniMap && (
              <MiniMap
                nodeStrokeColor={(n) => {
                  if (n.type === 'trigger') return '#f97316';
                  if (n.type === 'action') return '#3b82f6';
                  if (n.type === 'logic') return '#a855f7';
                  if (n.type === 'ai') return '#22c55e';
                  return '#ff0072';
                }}
                nodeColor={(n) => {
                  if (n.type === 'trigger') return '#fdba74';
                  if (n.type === 'action') return '#93c5fd';
                  if (n.type === 'logic') return '#d8b4fe';
                  if (n.type === 'ai') return '#86efac';
                  return '#ff0072';
                }}
              />
            )}
          </ReactFlow>
          
          {/* Add Node Button */}
          <button 
            className="absolute bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors duration-200"
            onClick={() => setSidebarOpen(true)}
          >
            <Plus size={24} />
          </button>
          
          {/* Toggle MiniMap Button */}
          <button 
            className="absolute bottom-6 left-6 p-2 rounded-lg bg-white dark:bg-surface-800 shadow-card border border-surface-200 dark:border-surface-700 text-sm font-medium"
            onClick={() => setShowMiniMap(!showMiniMap)}
          >
            {showMiniMap ? 'Hide Minimap' : 'Show Minimap'}
          </button>
        </div>
      </div>
      
      {/* Inspector Panel */}
      <AnimatePresence initial={false}>
        {inspectorOpen && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="sidebar w-80 flex flex-col z-10"
          >
            <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {selectedNode ? 'Node Inspector' : 'Workflow Settings'}
              </h2>
              <button 
                onClick={() => setInspectorOpen(false)}
                className="p-1 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {selectedNode ? (
                <MainFeature nodeData={selectedNode} />
              ) : (
                <div className="text-center py-8 text-surface-500 dark:text-surface-400">
                  <p>Select a node to configure it</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Toggle Inspector Button */}
      {!inspectorOpen && (
        <button
          onClick={() => setInspectorOpen(true)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-surface-800 shadow-card rounded-l-lg p-1.5 border border-r-0 border-surface-200 dark:border-surface-700"
        >
          <ChevronLeft size={20} />
        </button>
      )}
    </div>
  );
}

export default Home;