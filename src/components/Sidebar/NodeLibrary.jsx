import { useState } from 'react';
import { 
  Search, 
  AppWindow, // Changed from non-existent 'Apps' icon
  Zap, 
  CircuitBoard, 
  Database, 
  BrainCircuit 
} from 'lucide-react';
import { nodeDefinitions } from '../../data/nodeData';

const NodeLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredNode, setHoveredNode] = useState(null);

  const categories = {
    all: { icon: <Search size={20} />, label: 'All' },
    trigger: { icon: <Zap size={20} />, label: 'Triggers' },
    app: { icon: <AppWindow size={20} />, label: 'Apps' }, // Changed from Apps to AppWindow
    logic: { icon: <CircuitBoard size={20} />, label: 'Logic' },
    data: { icon: <Database size={20} />, label: 'Data' },
    ai: { icon: <BrainCircuit size={20} />, label: 'AI' }
  };

  const filteredNodes = nodeDefinitions.filter(node => {
    const matchesSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         node.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'all' || node.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const onDragStart = (event, nodeType, category) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('category', category);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800 shadow-md">
      {/* Search Bar */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search nodes..."
            className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
        {Object.entries(categories).map(([key, { icon, label }]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center space-x-1 px-3 py-2 text-sm ${
              activeTab === key 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
      
      {/* Node List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredNodes.length === 0 ? (
          <div className="text-center py-10 text-slate-500 dark:text-slate-400">
            No nodes match your search
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {filteredNodes.map((node) => (
              <div
                key={node.type}
                className={`p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md cursor-move hover:shadow-md transition-shadow ${
                  hoveredNode === node.type ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                }`}
                draggable
                onDragStart={(event) => onDragStart(event, node.type, node.category)}
                onMouseEnter={() => setHoveredNode(node.type)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="flex items-center space-x-2">
                  <div className={`p-1.5 rounded-md ${getCategoryColor(node.category)}`}>
                    {getCategoryIcon(node.category)}
                  </div>
                  <div>
                    <div className="font-medium text-sm dark:text-slate-200">{node.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {node.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions for node styling
function getCategoryColor(category) {
  switch (category) {
    case 'trigger':
      return 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400';
    case 'app':
      return 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400';
    case 'logic':
      return 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400';
    case 'data':
      return 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400';
    case 'ai':
      return 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400';
    default:
      return 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400';
  }
}

function getCategoryIcon(category) {
  switch (category) {
    case 'trigger':
      return <Zap size={16} />;
    case 'app':
      return <AppWindow size={16} />; // Changed from Apps to AppWindow
    case 'logic':
      return <CircuitBoard size={16} />;
    case 'data':
      return <Database size={16} />;
    case 'ai':
      return <BrainCircuit size={16} />;
    default:
      return <Search size={16} />;
  }
}

export default NodeLibrary;