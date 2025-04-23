import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, BookOpen, Package } from 'lucide-react';
import { nodeCategories } from '../../utils/nodeData';

const NodeLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    triggers: true,
    apps: true,
    logic: true,
    data: true,
    ai: true,
  });
  const [activeTab, setActiveTab] = useState('nodes'); // 'nodes' or 'marketplace'

  const toggleCategory = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  };

  // Filter nodes based on search term
  const filterNodes = (nodes) => {
    if (!searchTerm) return nodes;
    return nodes.filter(
      (node) =>
        node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Handle node drag start to transfer data to canvas
  const onDragStart = (event, nodeType, category) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('nodeCategory', category);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 'nodes'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-slate-600 dark:text-slate-400'
          }`}
          onClick={() => setActiveTab('nodes')}
        >
          <BookOpen size={16} className="inline mr-2" />
          Nodes
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 'marketplace'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-slate-600 dark:text-slate-400'
          }`}
          onClick={() => setActiveTab('marketplace')}
        >
          <Package size={16} className="inline mr-2" />
          Marketplace
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-700">
        <div className="relative">
          <Search
            size={16}
            className="absolute top-2.5 left-3 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search nodes..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Node Categories */}
      {activeTab === 'nodes' ? (
        <div className="flex-1 overflow-y-auto p-2">
          {Object.entries(nodeCategories).map(([category, { label, icon: Icon, nodes }]) => {
            const filteredNodes = filterNodes(nodes);
            if (filteredNodes.length === 0 && searchTerm) return null;

            return (
              <div key={category} className="mb-2">
                <button
                  className="flex items-center w-full p-2 text-left text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
                  onClick={() => toggleCategory(category)}
                >
                  {expandedCategories[category] ? (
                    <ChevronDown size={16} className="mr-2" />
                  ) : (
                    <ChevronRight size={16} className="mr-2" />
                  )}
                  <Icon size={16} className="mr-2" />
                  <span className="text-sm font-medium">{label}</span>
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                    ({filteredNodes.length})
                  </span>
                </button>

                {expandedCategories[category] && (
                  <div className="pl-10 mt-1 space-y-1">
                    {filteredNodes.map((node) => (
                      <div
                        key={node.type}
                        className="p-2 text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md cursor-grab"
                        draggable
                        onDragStart={(e) => onDragStart(e, node.type, category)}
                      >
                        {node.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-center py-8">
            <Package size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Node Marketplace</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Discover and install community-built nodes and integrations
            </p>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
              Browse Marketplace
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NodeLibrary;