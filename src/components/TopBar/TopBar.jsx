import React, { useState } from 'react';
import {
  Play,
  Save,
  Share,
  Settings,
  ChevronDown,
  Key,
  MoreHorizontal,
  Copy,
  Trash,
  Download,
  Upload,
  AlertCircle
} from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const TopBar = () => {
  const [workflowName, setWorkflowName] = useState('My Workflow');
  const [showDropdown, setShowDropdown] = useState(false);
  const selectedNode = useFlowStore(state => state.selectedNode);
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleNameChange = (e) => {
    setWorkflowName(e.target.value);
  };

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <input
            type="text"
            value={workflowName}
            onChange={handleNameChange}
            className="text-lg font-medium border-none focus:outline-none focus:ring-1 focus:ring-blue-500 px-2 py-1 rounded"
          />
          <ChevronDown 
            className="w-5 h-5 text-gray-500 cursor-pointer"
            onClick={toggleDropdown}
          />
          
          {showDropdown && (
            <div className="absolute top-12 left-4 bg-white shadow-lg rounded-md border border-gray-200 z-10">
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                  <Copy size={16} /> Duplicate
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                  <Trash size={16} /> Delete
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                  <Download size={16} /> Export
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                  <Upload size={16} /> Import
                </li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="h-6 w-px bg-gray-300"></div>
        
        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm text-gray-600">
          <AlertCircle size={14} />
          <span>Draft</span>
        </div>
      </div>
      
      {/* Middle section with current node */}
      <div className="flex-grow flex justify-center">
        {selectedNode && (
          <div className="text-sm text-gray-500">
            Selected: {selectedNode.data.label}
          </div>
        )}
      </div>
      
      {/* Right section */}
      <div className="flex items-center gap-2">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md">
          <Key size={18} />
        </button>
        
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md">
          <Settings size={18} />
        </button>
        
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md">
          <Share size={18} />
        </button>
        
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md">
          <Save size={18} />
        </button>
        
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md flex items-center gap-1">
          <Play size={16} />
          <span>Run</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;