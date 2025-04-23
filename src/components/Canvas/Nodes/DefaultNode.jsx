import React from 'react';
import { Handle, Position } from 'reactflow';
import { useFlowStore } from '../../../store/flowStore';
import { nodeDefinitions } from '../../../data/nodeData';

const DefaultNode = ({ id, data }) => {
  const { nodeType, label } = data;
  
  // Find the node definition to get icon and category
  const nodeDef = nodeDefinitions.find(node => node.type === nodeType);
  
  // Get the corresponding colors based on category
  const getCategoryColor = (category) => {
    switch (category) {
      case 'trigger':
        return 'bg-yellow-100 border-yellow-400';
      case 'app':
        return 'bg-blue-100 border-blue-400';
      case 'logic':
        return 'bg-purple-100 border-purple-400';
      case 'data':
        return 'bg-green-100 border-green-400';
      case 'ai':
        return 'bg-red-100 border-red-400';
      default:
        return 'bg-gray-100 border-gray-400';
    }
  };
  
  const nodeColor = nodeDef ? getCategoryColor(nodeDef.category) : 'bg-gray-100 border-gray-400';
  const IconComponent = nodeDef?.icon;
  
  return (
    <div className={`rounded-lg border-2 ${nodeColor} p-3 min-w-[150px] shadow-md`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />
      
      <div className="flex items-center space-x-2 mb-2">
        {IconComponent && <div className="text-gray-700"><IconComponent /></div>}
        <div className="font-medium text-gray-800">{label}</div>
      </div>
      
      {nodeDef && (
        <div className="text-xs text-gray-600">{nodeDef.description}</div>
      )}
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};

export default DefaultNode;