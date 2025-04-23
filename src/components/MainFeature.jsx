import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Trash2, 
  Copy, 
  Code, 
  Settings, 
  BrainCircuit, 
  Database, 
  Workflow, 
  Zap 
} from 'lucide-react';

function MainFeature({ nodeData }) {
  const [activeTab, setActiveTab] = useState('config');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    enabled: true,
    timeout: 30,
    retries: 0,
    advanced: {
      caching: false,
      logging: true
    }
  });
  const [aiSettings, setAiSettings] = useState({
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: 'You are a helpful assistant.'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Initialize form data when node changes
  useEffect(() => {
    if (nodeData) {
      setFormData({
        name: nodeData.data.label || '',
        description: nodeData.data.description || '',
        enabled: true,
        timeout: 30,
        retries: 0,
        advanced: {
          caching: false,
          logging: true
        }
      });
    }
  }, [nodeData]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };
  
  // Handle AI settings changes
  const handleAIChange = (e) => {
    const { name, value, type } = e.target;
    
    setAiSettings({
      ...aiSettings,
      [name]: type === 'range' || type === 'number' ? parseFloat(value) : value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Reset success message after 2 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    }, 800);
  };
  
  // Get icon based on node type
  const getNodeIcon = () => {
    if (!nodeData) return <Settings size={18} />;
    
    switch (nodeData.type) {
      case 'trigger':
        return <Zap size={18} />;
      case 'action':
        return <Workflow size={18} />;
      case 'logic':
        return <Code size={18} />;
      case 'ai':
        return <BrainCircuit size={18} />;
      default:
        return <Settings size={18} />;
    }
  };
  
  // Get color based on node type
  const getNodeColor = () => {
    if (!nodeData) return 'bg-surface-500';
    
    switch (nodeData.type) {
      case 'trigger':
        return 'bg-orange-500';
      case 'action':
        return 'bg-blue-500';
      case 'logic':
        return 'bg-purple-500';
      case 'ai':
        return 'bg-green-500';
      default:
        return 'bg-surface-500';
    }
  };
  
  if (!nodeData) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center mb-4">
          <Settings size={24} className="text-surface-500 dark:text-surface-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Node Selected</h3>
        <p className="text-surface-500 dark:text-surface-400 mb-6">
          Select a node from the canvas to configure it or add a new node from the library.
        </p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Node Header */}
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-lg ${getNodeColor()} flex items-center justify-center mr-3 shadow-sm`}>
          {getNodeIcon()}
        </div>
        <div>
          <h3 className="font-medium">{nodeData.data.label}</h3>
          <div className="text-xs text-surface-500 dark:text-surface-400">
            ID: {nodeData.id} • Type: {nodeData.type}
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-surface-200 dark:border-surface-700 mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'config'
              ? 'border-primary text-primary'
              : 'border-transparent text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200'
          }`}
          onClick={() => setActiveTab('config')}
        >
          Configuration
        </button>
        {nodeData.type === 'ai' && (
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'ai'
                ? 'border-primary text-primary'
                : 'border-transparent text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200'
            }`}
            onClick={() => setActiveTab('ai')}
          >
            AI Settings
          </button>
        )}
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'advanced'
              ? 'border-primary text-primary'
              : 'border-transparent text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200'
          }`}
          onClick={() => setActiveTab('advanced')}
        >
          Advanced
        </button>
      </div>
      
      {/* Tab Content */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
        {/* Configuration Tab */}
        {activeTab === 'config' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Node name"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 rounded-lg bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe what this node does"
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enabled"
                name="enabled"
                checked={formData.enabled}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-surface-300 rounded focus:ring-primary"
              />
              <label htmlFor="enabled" className="ml-2 text-sm">
                Enabled
              </label>
            </div>
            
            <div>
              <label htmlFor="timeout" className="block text-sm font-medium mb-1">
                Timeout (seconds)
              </label>
              <input
                type="number"
                id="timeout"
                name="timeout"
                value={formData.timeout}
                onChange={handleInputChange}
                min="1"
                max="300"
                className="w-full px-3 py-2 rounded-lg bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="retries" className="block text-sm font-medium mb-1">
                Retries
              </label>
              <input
                type="number"
                id="retries"
                name="retries"
                value={formData.retries}
                onChange={handleInputChange}
                min="0"
                max="10"
                className="w-full px-3 py-2 rounded-lg bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}
        
        {/* AI Settings Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="model" className="block text-sm font-medium mb-1">
                AI Model
              </label>
              <select
                id="model"
                name="model"
                value={aiSettings.model}
                onChange={handleAIChange}
                className="w-full px-3 py-2 rounded-lg bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                <option value="llama-3-70b">Llama 3 70B</option>
              </select>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="temperature" className="block text-sm font-medium">
                  Temperature
                </label>
                <span className="text-sm text-surface-500 dark:text-surface-400">
                  {aiSettings.temperature.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                id="temperature"
                name="temperature"
                value={aiSettings.temperature}
                onChange={handleAIChange}
                min="0"
                max="1"
                step="0.1"
                className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-surface-500 dark:text-surface-400 mt-1">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="maxTokens" className="block text-sm font-medium mb-1">
                Max Tokens
              </label>
              <input
                type="number"
                id="maxTokens"
                name="maxTokens"
                value={aiSettings.maxTokens}
                onChange={handleAIChange}
                min="1"
                max="8000"
                className="w-full px-3 py-2 rounded-lg bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="systemPrompt" className="block text-sm font-medium mb-1">
                System Prompt
              </label>
              <textarea
                id="systemPrompt"
                name="systemPrompt"
                value={aiSettings.systemPrompt}
                onChange={handleAIChange}
                rows="4"
                className="w-full px-3 py-2 rounded-lg bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Instructions for the AI model"
              ></textarea>
            </div>
            
            <div className="p-3 bg-surface-100 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Database size={16} className="mr-1.5" />
                Estimated Cost
              </h4>
              <div className="flex justify-between text-sm">
                <span className="text-surface-600 dark:text-surface-400">Input tokens:</span>
                <span>~500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-surface-600 dark:text-surface-400">Output tokens:</span>
                <span>~1,000</span>
              </div>
              <div className="flex justify-between text-sm font-medium mt-1 pt-1 border-t border-surface-200 dark:border-surface-700">
                <span>Estimated cost:</span>
                <span className="text-primary">$0.03 per run</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Advanced Tab */}
        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Caching</h4>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  Cache results to improve performance
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="advanced.caching"
                  name="advanced.caching"
                  checked={formData.advanced.caching}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <label
                  htmlFor="advanced.caching"
                  className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                    formData.advanced.caching ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                      formData.advanced.caching ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Logging</h4>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  Log execution details for debugging
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="advanced.logging"
                  name="advanced.logging"
                  checked={formData.advanced.logging}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <label
                  htmlFor="advanced.logging"
                  className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                    formData.advanced.logging ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                      formData.advanced.logging ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
              <h4 className="text-sm font-medium mb-3">Actions</h4>
              <div className="flex flex-col space-y-2">
                <button
                  type="button"
                  className="w-full px-3 py-2 text-sm text-left rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors flex items-center"
                >
                  <Copy size={16} className="mr-2" />
                  Duplicate Node
                </button>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-sm text-left rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors flex items-center"
                >
                  <Code size={16} className="mr-2" />
                  View JSON
                </button>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-sm text-left rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors flex items-center"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Node
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`btn btn-primary flex items-center ${
              isSaving ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Save size={18} className="mr-1.5" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        
        {/* Success Message */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Changes saved successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

export default MainFeature;