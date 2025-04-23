import React, { useState } from 'react';
import { Search, Bookmark, Clock, Plus } from 'lucide-react';
import { nodeCategories, nodeDefinitions } from '../../data/nodeData';
import { useFlowStore } from '../../store/flowStore';

const NodeLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('library'); // 'library', 'recent', 'favorites', 'marketplace'
  const [isExpanded, setIsExpanded] = useState(true);
  
  const addNode = useFlowStore((state) => state.addNode);
  
  // Filter nodes based on search and category
  const filteredNodes = nodeDefinitions.filter((node) => {
    const matchesSearch = node.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         node.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || node.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const handleDragStart = (event, node) => {
    // Set the data for the drag operation
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };
  
  const handleAddNode = (node) => {
    // Add node to the center of the visible canvas
    // In a real implementation, you would calculate the actual center position
    addNode({
      ...node,
      position: { x: 100, y: 100 },
    });
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`flex flex-col border-r border-gray-200 bg-white h-full ${isExpanded ? 'w-80' : 'w-14'} transition-all duration-300`}>
      {/* Toggle button */}
      <button 
        onClick={toggleExpanded}
        className="absolute top-3 -right-3 bg-white border border-gray-200 rounded-full p-1 shadow-sm z-10"
      >
        <div className="transform rotate-90">
          {isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          )}
        </div>
      </button>
      
      {isExpanded && (
        <>
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'library' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('library')}
            >
              Nodes
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'recent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('recent')}
            >
              <Clock size={16} className="inline mr-1" />
              Recent
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'favorites' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('favorites')}
            >
              <Bookmark size={16} className="inline mr-1" />
              Favorites
            </button>
          </div>
          
          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex px-3 space-x-2 overflow-x-auto pb-2">
            <button
              className={`px-3 py-1 text-xs rounded-full ${
                selectedCategory === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            {nodeCategories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1 text-xs rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Node list */}
          <div className="overflow-y-auto flex-grow">
            {activeTab === 'library' ? (
              filteredNodes.length > 0 ? (
                <div className="p-3 grid gap-2">
                  {filteredNodes.map((node) => (
                    <div
                      key={node.type}
                      className="bg-white border border-gray-200 rounded-md p-2 cursor-grab hover:shadow-md transition-shadow flex items-center"
                      draggable
                      onDragStart={(e) => handleDragStart(e, node)}
                      onClick={() => handleAddNode(node)}
                    >
                      <div className="p-1 mr-2 rounded" style={{ backgroundColor: getCategoryColor(node.category) + '20' }}>
                        {node.icon && node.icon()}
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium">{node.label}</div>
                        <div className="text-xs text-gray-500 truncate">{node.description}</div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Plus size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <p>No nodes found</p>
                </div>
              )
            ) : activeTab === 'recent' ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <p>Recent nodes will appear here</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <p>Favorite nodes will appear here</p>
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Collapsed state only shows icons */}
      {!isExpanded && (
        <div className="flex flex-col items-center py-4 space-y-6">
          <button className="p-2 rounded-full bg-blue-100 text-blue-600">
            <Plus size={18} />
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
            <Search size={18} />
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
            <Clock size={18} />
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
            <Bookmark size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

// Helper function for node colors
function getCategoryColor(category) {
  const colors = {
    trigger: '#ff9900',
    app: '#00a8ff',
    logic: '#7352ff',
    data: '#00c853',
    ai: '#ff5252',
  };
  return colors[category] || '#888';
}

export default NodeLibrary;