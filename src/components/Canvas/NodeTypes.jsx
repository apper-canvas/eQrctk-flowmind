import { Handle, Position } from 'reactflow';

// Base node component with common styling and functionality
const BaseNode = ({ data, selected, category, type, isConnectable }) => {
  // Color mapping based on node categories
  const categoryColors = {
    trigger: {
      bg: 'bg-amber-50 dark:bg-amber-900/30',
      border: 'border-amber-300 dark:border-amber-700',
      header: 'bg-amber-100 dark:bg-amber-800'
    },
    app: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-blue-300 dark:border-blue-700', 
      header: 'bg-blue-100 dark:bg-blue-800'
    },
    logic: {
      bg: 'bg-purple-50 dark:bg-purple-900/30',
      border: 'border-purple-300 dark:border-purple-700',
      header: 'bg-purple-100 dark:bg-purple-800'
    },
    data: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-300 dark:border-green-700',
      header: 'bg-green-100 dark:bg-green-800'
    },
    ai: {
      bg: 'bg-pink-50 dark:bg-pink-900/30',
      border: 'border-pink-300 dark:border-pink-700',
      header: 'bg-pink-100 dark:bg-pink-800'
    },
    default: {
      bg: 'bg-gray-50 dark:bg-gray-800',
      border: 'border-gray-300 dark:border-gray-700',
      header: 'bg-gray-100 dark:bg-gray-700'
    }
  };

  const styles = categoryColors[category] || categoryColors.default;
  const selectedStyles = selected ? 'shadow-lg border-2 border-blue-500 dark:border-blue-400' : '';

  return (
    <div className={`${styles.bg} ${styles.border} ${selectedStyles} border rounded-md min-w-[180px] transition-shadow`}>
      <div className={`${styles.header} px-3 py-2 rounded-t-md font-medium flex justify-between items-center`}>
        <div className="truncate">{data.label}</div>
        {data.version && <div className="text-xs bg-slate-200 dark:bg-slate-700 px-1.5 rounded">{data.version}</div>}
      </div>
      
      <div className="p-3">
        {data.description && (
          <div className="text-xs text-slate-600 dark:text-slate-300 mb-2">
            {data.description}
          </div>
        )}
        
        {/* Display configured fields if available */}
        {data.fields && Object.keys(data.fields).length > 0 && (
          <div className="text-xs space-y-1 border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
            {Object.entries(data.fields).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">{key}:</span>
                <span className="truncate max-w-[100px] font-medium">{value.toString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Input/output handles */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};

// Specialized nodes for different types
const TriggerNode = (props) => <BaseNode {...props} category="trigger" />;
const AppNode = (props) => <BaseNode {...props} category="app" />;
const LogicNode = (props) => <BaseNode {...props} category="logic" />;
const DataNode = (props) => <BaseNode {...props} category="data" />;
const AINode = (props) => <BaseNode {...props} category="ai" />;

// Export the node types map for ReactFlow
export const nodeTypes = {
  trigger: TriggerNode,
  app: AppNode,
  logic: LogicNode,
  data: DataNode,
  ai: AINode,
  default: BaseNode
};