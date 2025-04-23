import React from 'react';
import { useFlowStore } from '../../store/flowStore';
import { PanelRight, X, Code, Settings, ChevronDown, ChevronUp } from 'lucide-react';

// Common form components
const FormLabel = ({ children }) => (
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    {children}
  </label>
);

const FormInput = ({ label, value, onChange, type = "text", placeholder = "" }) => (
  <div className="mb-4">
    <FormLabel>{label}</FormLabel>
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800"
    />
  </div>
);

const FormSelect = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <FormLabel>{label}</FormLabel>
    <select
      value={value || ""}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const FormTextarea = ({ label, value, onChange, rows = 4, placeholder = "" }) => (
  <div className="mb-4">
    <FormLabel>{label}</FormLabel>
    <textarea
      value={value || ""}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800"
    />
  </div>
);

// Accordion component for property sections
const PropertySection = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <div className="mb-4 border dark:border-gray-700 rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {Icon && <Icon className="mr-2 h-5 w-5 text-gray-700 dark:text-gray-300" />}
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        )}
      </div>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-900">{children}</div>
      )}
    </div>
  );
};

// Node type specific property forms
const DefaultNodeProperties = ({ node, updateNode }) => {
  const handleLabelChange = (e) => {
    updateNode(node.id, { label: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    updateNode(node.id, { description: e.target.value });
  };

  return (
    <>
      <FormInput 
        label="Node Label" 
        value={node.data.label} 
        onChange={handleLabelChange} 
        placeholder="Enter node label"
      />
      <FormTextarea 
        label="Description" 
        value={node.data.description || ""} 
        onChange={handleDescriptionChange} 
        placeholder="Enter node description"
      />
    </>
  );
};

const TriggerNodeProperties = ({ node, updateNode }) => {
  const handleLabelChange = (e) => {
    updateNode(node.id, { label: e.target.value });
  };
  
  const handleTriggerTypeChange = (e) => {
    updateNode(node.id, { triggerType: e.target.value });
  };
  
  const triggerTypes = [
    { value: "webhook", label: "Webhook" },
    { value: "cron", label: "Scheduled (Cron)" },
    { value: "event", label: "Event Based" },
    { value: "manual", label: "Manual Trigger" }
  ];

  return (
    <>
      <FormInput 
        label="Trigger Name" 
        value={node.data.label} 
        onChange={handleLabelChange} 
      />
      <FormSelect 
        label="Trigger Type" 
        value={node.data.triggerType || "webhook"} 
        onChange={handleTriggerTypeChange}
        options={triggerTypes}  
      />
    </>
  );
};

const ActionNodeProperties = ({ node, updateNode }) => {
  const handleLabelChange = (e) => {
    updateNode(node.id, { label: e.target.value });
  };
  
  const handleServiceChange = (e) => {
    updateNode(node.id, { service: e.target.value });
  };
  
  const handleOperationChange = (e) => {
    updateNode(node.id, { operation: e.target.value });
  };
  
  const services = [
    { value: "slack", label: "Slack" },
    { value: "github", label: "GitHub" },
    { value: "discord", label: "Discord" },
    { value: "webhook", label: "Webhook" },
    { value: "custom", label: "Custom HTTP" }
  ];
  
  const operations = [
    { value: "send", label: "Send Message" },
    { value: "create", label: "Create Resource" },
    { value: "update", label: "Update Resource" },
    { value: "delete", label: "Delete Resource" }
  ];

  return (
    <>
      <FormInput 
        label="Action Name" 
        value={node.data.label} 
        onChange={handleLabelChange} 
      />
      <FormSelect 
        label="Service" 
        value={node.data.service || ""} 
        onChange={handleServiceChange}
        options={services}  
      />
      <FormSelect 
        label="Operation" 
        value={node.data.operation || ""} 
        onChange={handleOperationChange}
        options={operations}  
      />
    </>
  );
};

const AINodeProperties = ({ node, updateNode }) => {
  const handleLabelChange = (e) => {
    updateNode(node.id, { label: e.target.value });
  };
  
  const handleModelChange = (e) => {
    updateNode(node.id, { model: e.target.value });
  };
  
  const handlePromptChange = (e) => {
    updateNode(node.id, { prompt: e.target.value });
  };
  
  const models = [
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "claude-3-opus", label: "Claude 3 Opus" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
    { value: "llama-3", label: "Llama 3" }
  ];

  return (
    <>
      <FormInput 
        label="AI Node Name" 
        value={node.data.label} 
        onChange={handleLabelChange} 
      />
      <FormSelect 
        label="LLM Model" 
        value={node.data.model || "gpt-4"} 
        onChange={handleModelChange}
        options={models}  
      />
      <FormTextarea 
        label="Prompt Template" 
        value={node.data.prompt || ""} 
        onChange={handlePromptChange} 
        placeholder="Enter your prompt here..."
        rows={6}
      />
    </>
  );
};

// Main PropertyPanel component
const PropertyPanel = () => {
  const { nodes, selectedNodeId, updateNode, clearSelection } = useFlowStore();
  
  const selectedNode = nodes.find(node => node.id === selectedNodeId);
  
  // If no node is selected, display empty state
  if (!selectedNode) {
    return (
      <div className="w-full h-full flex-shrink-0 border-l dark:border-gray-700 bg-white dark:bg-gray-900 overflow-y-auto">
        <div className="p-4 h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <PanelRight className="h-12 w-12 mb-2" />
          <p>Select a node to view and edit its properties</p>
        </div>
      </div>
    );
  }
  
  // Helper to get the right property component based on node type
  const getPropertyForm = () => {
    const type = selectedNode.type || selectedNode.data.type || 'default';
    
    switch (type) {
      case 'trigger':
        return <TriggerNodeProperties node={selectedNode} updateNode={updateNode} />;
      case 'action':
      case 'app':
        return <ActionNodeProperties node={selectedNode} updateNode={updateNode} />;
      case 'ai':
        return <AINodeProperties node={selectedNode} updateNode={updateNode} />;
      default:
        return <DefaultNodeProperties node={selectedNode} updateNode={updateNode} />;
    }
  };
  
  return (
    <div className="w-full h-full flex-shrink-0 border-l dark:border-gray-700 bg-white dark:bg-gray-900 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Node Properties
          </h2>
          <button 
            onClick={clearSelection}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-600 dark:text-gray-400">
          Node ID: {selectedNode.id}
        </div>
        
        <PropertySection title="Basic Properties" defaultOpen={true}>
          {getPropertyForm()}
        </PropertySection>
        
        <PropertySection title="Advanced Configuration" icon={Settings}>
          <FormInput 
            label="Execution Order" 
            type="number" 
            value={selectedNode.data.executionOrder || "1"} 
            onChange={(e) => updateNode(selectedNode.id, { executionOrder: e.target.value })} 
          />
          <FormSelect 
            label="Error Handling" 
            value={selectedNode.data.errorHandling || "stop"} 
            onChange={(e) => updateNode(selectedNode.id, { errorHandling: e.target.value })}
            options={[
              { value: "stop", label: "Stop Flow Execution" },
              { value: "continue", label: "Continue to Next Node" },
              { value: "retry", label: "Retry This Node" }
            ]}  
          />
        </PropertySection>
        
        <PropertySection title="Input/Output Schema" icon={Code}>
          <FormTextarea 
            label="Input Schema" 
            value={selectedNode.data.inputSchema || ""} 
            onChange={(e) => updateNode(selectedNode.id, { inputSchema: e.target.value })}
            placeholder="Paste JSON schema here..."
          />
          <FormTextarea 
            label="Output Schema" 
            value={selectedNode.data.outputSchema || ""} 
            onChange={(e) => updateNode(selectedNode.id, { outputSchema: e.target.value })}
            placeholder="Paste JSON schema here..."
          />
        </PropertySection>
      </div>
    </div>
  );
};

export default PropertyPanel;