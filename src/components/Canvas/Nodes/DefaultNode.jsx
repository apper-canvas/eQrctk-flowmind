import React from 'react';
import { Handle, Position } from 'reactflow';
import { useFlowStore } from '../../../store/flowStore';

const DefaultNode = ({ data, id }) => {
  const setSelectedNode = useFlowStore(state => state.setSelectedNode);
  const nodes = useFlowStore(state => state.nodes);
  
  const handleNodeClick = () => {
    const node = nodes.find(node => node.id === id);
    if (node) {
      setSelectedNode(node);
    }
  };
  
  let backgroundColor = '#f8fafc'; // Default light color
  let textColor = '#1e293b';       // Default dark text
  
  // Set colors based on category
  switch (data.category) {
    case 'trigger':
      backgroundColor = '#fee2e2'; // Light red
      break;
    case 'app':
      backgroundColor = '#e0f2fe'; // Light blue
      break;
    case 'logic':
      backgroundColor = '#fef3c7'; // Light yellow
      break;
    case 'data':
      backgroundColor = '#dcfce7'; // Light green
      break;
    case 'ai':
      backgroundColor = '#f3e8ff'; // Light purple
      break;
    default:
      backgroundColor = '#f8fafc'; // Default light gray
  }
  
  return (
    <div 
      className="rounded-lg border border-gray-200 shadow-sm min-w-[180px] cursor-pointer"
      onClick={handleNodeClick}
      style={{ backgroundColor }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-500"
      />
      
      {/* Node Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          {data.icon && (
            <span className="text-gray-700">
              {data.icon}
            </span>
          )}
          <span className="font-medium text-sm">{data.label}</span>
        </div>
      </div>
      
      {/* Node Content */}
      <div className="p-3">
        <p className="text-xs text-gray-600">{data.description || 'No description'}</p>
      </div>
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};

export default DefaultNode;