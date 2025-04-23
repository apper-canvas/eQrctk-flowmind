import { useState } from 'react';
import { useFlowStore } from '../../store/flowStore';
import { Sliders, Code, Brain, Database, History } from 'lucide-react';

const InspectorPanel = ({ node }) => {
  const [activeTab, setActiveTab] = useState('settings');
  const updateNodeData = useFlowStore(state => state.updateNodeData);

  if (!node) {
    return (
      <div className="flex items-center justify-center h-full p-6 text-slate-500 dark:text-slate-400">
        <div className="text-center">
          <Sliders className="mx-auto mb-4" size={32} />
          <p className="text-sm">Select a node to configure it</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (key, value) => {
    const newFields = { ...(node.data.fields || {}) };
    newFields[key] = value;
    
    updateNodeData(node.id, {
      ...node.data,
      fields: newFields
    });
  };

  // Generate form fields based on node type
  const renderFormFields = () => {
    const nodeType = node.type;
    
    // These would normally come from node definitions
    let fields = [];
    
    if (nodeType === 'trigger') {
      fields = [
        { key: 'eventType', label: 'Event Type', type: 'select', options: ['Webhook', 'Schedule', 'Watch File'] },
        { key: 'path', label: 'Webhook Path', type: 'text' },
      ];
    } else if (nodeType === 'app') {
      fields = [
        { key: 'service', label: 'Service', type: 'select', options: ['Slack', 'Discord', 'GitHub'] },
        { key: 'action', label: 'Action', type: 'select', options: ['Send Message', 'Create Issue', 'Add Comment'] },
        { key: 'channel', label: 'Channel', type: 'text' },
      ];
    } else if (nodeType === 'logic') {
      fields = [
        { key: 'operation', label: 'Operation', type: 'select', options: ['IF', 'SWITCH', 'MERGE', 'WAIT'] },
        { key: 'condition', label: 'Condition', type: 'text' },
      ];
    } else if (nodeType === 'data') {
      fields = [
        { key: 'dataSource', label: 'Data Source', type: 'select', options: ['MySQL', 'Postgres', 'REST API'] },
        { key: 'operation', label: 'Operation', type: 'select', options: ['Query', 'Insert', 'Update', 'Delete'] },
        { key: 'query', label: 'Query', type: 'textarea' },
      ];
    } else if (nodeType === 'ai') {
      fields = [
        { key: 'model', label: 'Model', type: 'select', options: ['GPT-4', 'Claude 3', 'Mistral Large'] },
        { key: 'temperature', label: 'Temperature', type: 'range' },
        { key: 'maxTokens', label: 'Max Tokens', type: 'number' },
      ];
    }
    
    return fields.map((field) => (
      <div key={field.key} className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {field.label}
        </label>
        
        {field.type === 'text' && (
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={(node.data.fields && node.data.fields[field.key]) || ''}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
          />
        )}
        
        {field.type === 'textarea' && (
          <textarea
            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={(node.data.fields && node.data.fields[field.key]) || ''}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            rows={3}
          />
        )}
        
        {field.type === 'select' && (
          <select
            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={(node.data.fields && node.data.fields[field.key]) || ''}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
          >
            <option value="">Select {field.label}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        
        {field.type === 'range' && (
          <div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              className="w-full"
              value={(node.data.fields && node.data.fields[field.key]) || 0.7}
              onChange={(e) => handleInputChange(field.key, parseFloat(e.target.value))}
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0</span>
              <span>{(node.data.fields && node.data.fields[field.key]) || 0.7}</span>
              <span>1</span>
            </div>
          </div>
        )}
        
        {field.type === 'number' && (
          <input
            type="number"
            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={(node.data.fields && node.data.fields[field.key]) || ''}
            onChange={(e) => handleInputChange(field.key, parseInt(e.target.value))}
          />
        )}
      </div>
    ));
  };

  // AI-specific tabs and panels
  const isAINode = node.type === 'ai';

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="font-medium text-lg">{node.data.label || 'Node Settings'}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {node.data.description || `Configure your ${node.type} node`}
        </p>
      </div>
      
      <div className="border-b border-slate-200 dark:border-slate-700">
        <div className="flex overflow-x-auto">
          <button
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'settings'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-slate-600 dark:text-slate-400'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Sliders size={16} className="inline mr-1" />
            Settings
          </button>
          
          {isAINode && (
            <>
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'prompt'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
                onClick={() => setActiveTab('prompt')}
              >
                <Code size={16} className="inline mr-1" />
                Prompt
              </button>
              
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'memory'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
                onClick={() => setActiveTab('memory')}
              >
                <Brain size={16} className="inline mr-1" />
                Memory
              </button>
              
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'tools'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
                onClick={() => setActiveTab('tools')}
              >
                <Database size={16} className="inline mr-1" />
                Tools
              </button>
            </>
          )}
          
          <button
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'history'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-slate-600 dark:text-slate-400'
            }`}
            onClick={() => setActiveTab('history')}
          >
            <History size={16} className="inline mr-1" />
            History
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {activeTab === 'settings' && (
          <div>{renderFormFields()}</div>
        )}
        
        {activeTab === 'prompt' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Prompt Template
            </label>
            <textarea
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              rows={10}
              value={(node.data.fields && node.data.fields.promptTemplate) || ''}
              onChange={(e) => handleInputChange('promptTemplate', e.target.value)}
              placeholder="Enter your prompt template here..."
            />
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Use {`{{variable}}`} syntax to reference input data.
            </div>
          </div>
        )}
        
        {activeTab === 'memory' && (
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Configure how this AI node stores and retrieves context from previous interactions.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Memory Type
              </label>
              <select
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(node.data.fields && node.data.fields.memoryType) || 'buffer'}
                onChange={(e) => handleInputChange('memoryType', e.target.value)}
              >
                <option value="buffer">Simple Buffer</option>
                <option value="conversation">Conversation History</option>
                <option value="vectorstore">Vector Store</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Max History Items
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(node.data.fields && node.data.fields.maxHistory) || 10}
                onChange={(e) => handleInputChange('maxHistory', parseInt(e.target.value))}
              />
            </div>
          </div>
        )}
        
        {activeTab === 'tools' && (
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Configure the tools this AI agent can use to interact with external systems.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="tool-web"
                  className="mr-2"
                  checked={(node.data.fields && node.data.fields.webTool) || false}
                  onChange={(e) => handleInputChange('webTool', e.target.checked)}
                />
                <label htmlFor="tool-web" className="text-sm">Web Browsing</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="tool-calc"
                  className="mr-2"
                  checked={(node.data.fields && node.data.fields.calculatorTool) || false}
                  onChange={(e) => handleInputChange('calculatorTool', e.target.checked)}
                />
                <label htmlFor="tool-calc" className="text-sm">Calculator</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="tool-db"
                  className="mr-2"
                  checked={(node.data.fields && node.data.fields.databaseTool) || false}
                  onChange={(e) => handleInputChange('databaseTool', e.target.checked)}
                />
                <label htmlFor="tool-db" className="text-sm">Database Query</label>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
              <h4 className="text-sm font-medium mb-1">Custom Tool</h4>
              <input
                type="text"
                placeholder="Tool Name"
                className="w-full px-3 py-2 mb-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Tool Function (JavaScript)"
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                rows={3}
              />
              <button className="mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Add Tool
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              View the version history of this node.
            </p>
            <div className="space-y-2">
              <div className="p-2 border border-slate-200 dark:border-slate-700 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Current Version</div>
                  <div className="text-xs text-slate-500">Now</div>
                </div>
              </div>
              <div className="p-2 border border-slate-200 dark:border-slate-700 rounded-md opacity-75">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Initial Version</div>
                  <div className="text-xs text-slate-500">10 minutes ago</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectorPanel;