import React, { useState } from 'react';
import { Search, Filter, X, Star, Clock } from 'lucide-react';
import { nodeCategories, nodeDefinitions } from '../../data/nodeData';

const NodeLibrary = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleDragStart = (event, node) => {
    // Set the node data as a string in the dataTransfer object
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };
  
  // Filter nodes based on search term and active tab
  const filteredNodes = nodeDefinitions.filter(node => {
    const matchesSearch = 
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
      node.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === 'all') {
      return matchesSearch;
    } else {
      return matchesSearch && node.category === activeTab;
    }
  });

  return (
    <div className="w-64 border-r border-gray-200 bg-white h-full flex flex-col">
      {/* Header with search */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-lg mb-3">Nodes</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search nodes..."
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          {searchTerm && (
            <button 
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 flex overflow-x-auto">
        <button
          className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === 'all' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        
        {nodeCategories.map(category => (
          <button
            key={category.id}
            className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === category.id 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Node list */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredNodes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No nodes found matching "{searchTerm}"
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNodes.map((node) => (
              <div
                key={`${node.type}-${node.label}`}
                className="p-3 bg-white border border-gray-200 rounded-md hover:border-blue-400 hover:shadow-sm cursor-grab"
                draggable
                onDragStart={(e) => handleDragStart(e, node)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {node.icon}
                    <span className="font-medium">{node.label}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-yellow-500">
                      <Star className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-500">
                      <Clock className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {node.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-200 p-3">
        <button className="flex items-center justify-center w-full px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter options
        </button>
      </div>
    </div>
  );
};

export default NodeLibrary;