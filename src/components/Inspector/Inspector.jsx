import React from 'react';
import { X, ChevronUp, Settings, MessageSquare, Tool, Database, Clock, ArrowRight } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const Inspector = () => {
  const selectedNode = useFlowStore(state => state.selectedNode);
  const updateSelectedNode = useFlowStore(state => state.updateSelectedNode);
  
  if (!selectedNode) {
    return (
      <div className="w-72 border-l border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-6 flex flex-col items-center justify-center h-full text-gray-400 text-center">
          <Settings size={48} className="mb-3 opacity-30" />
          <h3 className="font-medium text-gray-500 mb-1">No Node Selected</h3>
          <p className="text-sm text-gray-400">
            Select a node to configure its properties
          </p>
        </div>
      </div>
    );
  }
  
  const handleNameChange = (e) => {
    updateSelectedNode({ label: e.target.value });
  };
  
  const handleDescriptionChange = (e) => {
    updateSelectedNode({ description: e.target.value });
  };

  return (
    <div className="w-72 border-l border-gray-200 bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 className="font-medium">Node Settings</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 flex">
        <button className="px-3 py-2 text-blue-600 border-b-2 border-blue-600 text-sm font-medium">
          Settings
        </button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium">
          Input
        </button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium">
          Output
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedNode.data.label}
              onChange={handleNameChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px]"
              value={selectedNode.data.description || ''}
              onChange={handleDescriptionChange}
            />
          </div>
          
          {/* Node-specific settings based on type */}
          {selectedNode.data.category === 'trigger' && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex items-center mb-3">
                <Clock size={16} className="text-gray-600 mr-2" />
                <h4 className="font-medium text-sm">Trigger Settings</h4>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1">
                  Schedule Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Interval</option>
                  <option>Cron Expression</option>
                  <option>Fixed Time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Interval (minutes)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  defaultValue="15"
                />
              </div>
            </div>
          )}
          
          {selectedNode.data.category === 'app' && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex items-center mb-3">
                <ArrowRight size={16} className="text-gray-600 mr-2" />
                <h4 className="font-medium text-sm">App Action</h4>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1">
                  Operation
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Send Message</option>
                  <option>Create Resource</option>
                  <option>Update Resource</option>
                  <option>Delete Resource</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Connection
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Select a connection...</option>
                  <option>Add new connection...</option>
                </select>
              </div>
            </div>
          )}
          
          {selectedNode.data.category === 'ai' && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex items-center mb-3">
                <MessageSquare size={16} className="text-gray-600 mr-2" />
                <h4 className="font-medium text-sm">AI Model Settings</h4>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1">
                  Model
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>GPT-4</option>
                  <option>GPT-3.5 Turbo</option>
                  <option>Claude 3 Opus</option>
                  <option>Claude 3 Sonnet</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1">
                  Temperature
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="0.7"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Precise 0</span>
                  <span>0.7</span>
                  <span>Creative 1</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Prompt Template
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px]"
                  defaultValue={`You are a helpful assistant. {{input}}`}
                />
              </div>
            </div>
          )}
          
          {selectedNode.data.category === 'data' && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex items-center mb-3">
                <Database size={16} className="text-gray-600 mr-2" />
                <h4 className="font-medium text-sm">Data Settings</h4>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1">
                  Data Source
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>HTTP Request</option>
                  <option>Database Query</option>
                  <option>CSV File</option>
                  <option>JSON</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Endpoint URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="https://api.example.com/data"
                />
              </div>
            </div>
          )}
          
          {selectedNode.data.category === 'logic' && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex items-center mb-3">
                <Tool size={16} className="text-gray-600 mr-2" />
                <h4 className="font-medium text-sm">Logic Settings</h4>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1">
                  Logic Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>IF Condition</option>
                  <option>Switch</option>
                  <option>Loop</option>
                  <option>Merge</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Condition Expression
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-sm"
                  placeholder="data.value > 10"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-200 p-3">
        <button className="flex items-center justify-center w-full px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-sm">
          <ChevronUp className="h-4 w-4 mr-2" />
          Advanced Settings
        </button>
      </div>
    </div>
  );
};

export default Inspector;