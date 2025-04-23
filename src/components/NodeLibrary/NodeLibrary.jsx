import React, { useState } from 'react';
import { nodeCategories, nodeDefinitions } from '../../data/nodeData';
import NodeItem from './NodeItem';

const NodeLibrary = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter nodes based on active tab and search term
  const filteredNodes = nodeDefinitions.filter(node => {
    // Filter by category if not "all"
    const categoryMatch = activeTab === 'all' || node.category === activeTab;
    
    // Filter by search term (case insensitive)
    const searchMatch = 
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });
  
  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search nodes..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Category Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'all'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        
        {nodeCategories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === category.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Node List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-2">
          {filteredNodes.map((node) => (
            <NodeItem key={node.type} node={node} />
          ))}
          
          {filteredNodes.length === 0 && (
            <div className="col-span-1 py-6 text-center text-gray-500">
              No nodes found for "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NodeLibrary;