import React from 'react';
import { Handle, Position } from 'reactflow';
import { useFlowStore } from '../../../store/flowStore';

const DefaultNode = ({ id, data }) => {
  const { type, label, category, properties } = data;
  const setSelectedNode = useFlowStore((state) => state.setSelectedNode);
  
  // Node color based on category
  const getCategoryColor = (category) => {
    const colors = {
      trigger: '#ff9900',
      app: '#00a8ff',
      logic: '#7352ff',
      data: '#00c853',
      ai: '#ff5252',
    };
    return colors[category] || '#888';
  };
  
  const getBgColor = (category) => {
    const colors = {
      trigger: 'bg-orange-50',
      app: 'bg-blue-50',
      logic: 'bg-purple-50',
      data: 'bg-green-50',
      ai: 'bg-red-50',
    };
    return colors[category] || 'bg-gray-50';
  };
  
  const color = getCategoryColor(category);
  const bgColorClass = getBgColor(category);
  
  const handleNodeClick = () => {
    setSelectedNode({ id, data });
  };

  return (
    <div 
      className={`rounded-lg border-2 shadow-sm ${bgColorClass} w-60`}
      style={{ borderColor: color }}
      onClick={handleNodeClick}
    >
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: color, width: 8, height: 8 }}
      />
      
      {/* Node header */}
      <div 
        className="px-3 py-2 rounded-t-md font-medium flex items-center"
        style={{ background: color, color: '#fff' }}
      >
        {data.icon && <span className="mr-2">{data.icon()}</span>}
        <div>{label}</div>
      </div>
      
      {/* Node content */}
      <div className="p-3">
        <div className="text-xs text-gray-500">{data.description}</div>
        
        {/* Show a few key properties if available */}
        {properties && Object.keys(properties).length > 0 && (
          <div className="mt-2 text-xs space-y-1">
            {Object.entries(properties).slice(0, 3).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium">{key}:</span>
                <span className="truncate max-w-[120px]">
                  {typeof value === 'object' 
                    ? JSON.stringify(value).substring(0, 15) + '...' 
                    : String(value).substring(0, 15)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: color, width: 8, height: 8 }}
      />
    </div>
  );
};

export default DefaultNode;