import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const DefaultNode = ({ data, selected }) => {
  // Calculate border color based on node type and selection state
  const getBorderColor = () => {
    if (selected) return 'border-blue-500';
    
    switch (data.type) {
      case 'trigger':
        return 'border-orange-500';
      case 'action':
      case 'app':
        return 'border-green-500';
      case 'logic':
        return 'border-purple-500';
      case 'ai':
        return 'border-red-500';
      default:
        return 'border-gray-300 dark:border-gray-700';
    }
  };

  // Calculate header background color based on node type
  const getHeaderColor = () => {
    switch (data.type) {
      case 'trigger':
        return 'bg-orange-100 dark:bg-orange-900';
      case 'action':
      case 'app':
        return 'bg-green-100 dark:bg-green-900';
      case 'logic':
        return 'bg-purple-100 dark:bg-purple-900';
      case 'ai':
        return 'bg-red-100 dark:bg-red-900';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  // Calculate icon background color
  const getIconBgColor = () => {
    switch (data.type) {
      case 'trigger':
        return 'bg-orange-500';
      case 'action':
      case 'app':
        return 'bg-green-500';
      case 'logic':
        return 'bg-purple-500';
      case 'ai':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Render the node icon if provided
  const renderIcon = () => {
    const Icon = data.icon;
    
    if (Icon) {
      return (
        <div className={`${getIconBgColor()} p-1 rounded-lg text-white`}>
          <Icon size={16} />
        </div>
      );
    }
    
    return null;
  };

  return (
    <div 
      className={`min-w-[180px] max-w-[300px] shadow-md rounded-lg bg-white dark:bg-gray-900 border-2 ${getBorderColor()} transition-colors`}
    >
      {/* Input handle at the top */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />

      {/* Node header */}
      <div className={`flex items-center gap-2 px-3 py-2 ${getHeaderColor()} rounded-t-md`}>
        {renderIcon()}
        <div className="font-medium truncate text-gray-800 dark:text-gray-200">
          {data.label}
        </div>
      </div>

      {/* Node content */}
      <div className="p-3">
        {data.description && (
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            {data.description}
          </div>
        )}
        
        {data.parameters && (
          <div className="mt-2 text-xs">
            {Object.entries(data.parameters).map(([key, value]) => (
              <div key={key} className="flex justify-between mb-1">
                <span className="text-gray-500 dark:text-gray-400">{key}:</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-[120px]">
                  {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Output handle at the bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};

export default memo(DefaultNode);