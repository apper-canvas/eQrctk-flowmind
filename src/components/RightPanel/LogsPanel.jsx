import { useState } from 'react';
import { Terminal, AlertTriangle, Info, CheckCircle, Filter, Download } from 'lucide-react';

const LogsPanel = () => {
  const [filterLevel, setFilterLevel] = useState('all');
  
  // Sample logs for demonstration
  const logs = [
    { id: 1, level: 'info', message: 'Workflow execution started', timestamp: '2023-05-01T10:30:15', nodeId: null },
    { id: 2, level: 'info', message: 'Node "Webhook Trigger" executed successfully', timestamp: '2023-05-01T10:30:16', nodeId: 'node-1' },
    { id: 3, level: 'debug', message: 'Input data received: { "user": "john", "action": "login" }', timestamp: '2023-05-01T10:30:17', nodeId: 'node-1' },
    { id: 4, level: 'info', message: 'Node "Data Transform" executed successfully', timestamp: '2023-05-01T10:30:18', nodeId: 'node-2' },
    { id: 5, level: 'warning', message: 'Rate limit approaching for API service', timestamp: '2023-05-01T10:30:19', nodeId: 'node-3' },
    { id: 6, level: 'error', message: 'Failed to connect to database: Connection timeout', timestamp: '2023-05-01T10:30:20', nodeId: 'node-4' },
    { id: 7, level: 'info', message: 'Retrying database connection (1/3)', timestamp: '2023-05-01T10:30:21', nodeId: 'node-4' },
    { id: 8, level: 'info', message: 'Workflow execution completed with errors', timestamp: '2023-05-01T10:30:22', nodeId: null },
  ];
  
  // Filter logs based on selected level
  const filteredLogs = filterLevel === 'all' 
    ? logs 
    : logs.filter(log => log.level === filterLevel);
  
  // Level-based styling
  const getLevelStyles = (level) => {
    switch (level) {
      case 'error':
        return {
          bgColor: 'bg-red-100 dark:bg-red-900/30',
          textColor: 'text-red-700 dark:text-red-400',
          icon: <AlertTriangle size={14} className="text-red-500" />
        };
      case 'warning':
        return {
          bgColor: 'bg-amber-100 dark:bg-amber-900/30',
          textColor: 'text-amber-700 dark:text-amber-400',
          icon: <AlertTriangle size={14} className="text-amber-500" />
        };
      case 'info':
        return {
          bgColor: 'bg-blue-100 dark:bg-blue-900/30',
          textColor: 'text-blue-700 dark:text-blue-400',
          icon: <Info size={14} className="text-blue-500" />
        };
      case 'debug':
        return {
          bgColor: 'bg-gray-100 dark:bg-gray-800',
          textColor: 'text-gray-700 dark:text-gray-400',
          icon: <Terminal size={14} className="text-gray-500" />
        };
      case 'success':
        return {
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          textColor: 'text-green-700 dark:text-green-400',
          icon: <CheckCircle size={14} className="text-green-500" />
        };
      default:
        return {
          bgColor: 'bg-gray-100 dark:bg-gray-800',
          textColor: 'text-gray-700 dark:text-gray-400',
          icon: <Info size={14} className="text-gray-500" />
        };
    }
  };
  
  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <h2 className="font-medium">Execution Logs</h2>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="pl-8 pr-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="error">Errors</option>
              <option value="warning">Warnings</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
            <Filter size={12} className="absolute left-2 top-2.5 text-slate-400" />
          </div>
          
          <button className="p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {filteredLogs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
            <div className="text-center">
              <Terminal className="mx-auto mb-2" size={24} />
              <p className="text-sm">No logs to display</p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredLogs.map((log) => {
              const { bgColor, textColor, icon } = getLevelStyles(log.level);
              
              return (
                <div
                  key={log.id}
                  className={`p-2 rounded-md text-xs ${bgColor} ${textColor}`}
                >
                  <div className="flex items-start">
                    <div className="mt-0.5 mr-2 flex-shrink-0">
                      {icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{log.level.toUpperCase()}</span>
                        <span className="text-slate-500 dark:text-slate-400 ml-2">
                          {formatTime(log.timestamp)}
                        </span>
                      </div>
                      <p className="mt-1 whitespace-pre-wrap font-mono">{log.message}</p>
                      {log.nodeId && (
                        <div className="mt-1 text-slate-500 dark:text-slate-400">
                          Node: {log.nodeId}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsPanel;