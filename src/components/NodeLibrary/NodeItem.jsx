import React from 'react';

const NodeItem = ({ node }) => {
  // Function to start dragging a node
  const onDragStart = (event) => {
    // Set the node type as drag data
    event.dataTransfer.setData('application/reactflow/type', node.type);
    
    // Set additional node data as JSON
    event.dataTransfer.setData(
      'application/reactflow/data',
      JSON.stringify({
        nodeType: node.type,
        label: node.label,
        description: node.description
      })
    );
    
    // Set drag effect
    event.dataTransfer.effectAllowed = 'move';
  };
  
  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'trigger':
        return 'bg-yellow-100 border-yellow-300';
      case 'app':
        return 'bg-blue-100 border-blue-300';
      case 'logic':
        return 'bg-purple-100 border-purple-300';
      case 'data':
        return 'bg-green-100 border-green-300';
      case 'ai':
        return 'bg-red-100 border-red-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };
  
  const nodeColor = getCategoryColor(node.category);
  const IconComponent = node.icon;
  
  return (
    <div
      className={`flex items-center p-2 rounded-md border ${nodeColor} cursor-grab hover:shadow-md transition-shadow`}
      draggable
      onDragStart={onDragStart}
    >
      <div className="mr-3 text-gray-600">
        {IconComponent && <IconComponent />}
      </div>
      <div>
        <div className="font-medium text-sm">{node.label}</div>
        <div className="text-xs text-gray-600 truncate">{node.description}</div>
      </div>
    </div>
  );
};

export default NodeItem;