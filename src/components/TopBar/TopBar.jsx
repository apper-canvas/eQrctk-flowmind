import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Save, 
  Share2, 
  Settings, 
  Undo, 
  Redo,
  HelpCircle,
  Key as KeyIcon
} from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const TopBar = () => {
  const [workflowName, setWorkflowName] = useState('My Workflow');
  const [isRunning, setIsRunning] = useState(false);
  
  const nodes = useFlowStore((state) => state.nodes);
  
  const handleRun = () => {
    setIsRunning(!isRunning);
    // Logic for running/pausing the workflow
    console.log(`Workflow ${isRunning ? 'paused' : 'running'}`);
  };
  
  const handleSave = () => {
    // Logic for saving the workflow
    console.log('Workflow saved');
    
    // Example of what might be saved
    const workflowData = {
      name: workflowName,
      nodes: nodes,
      // Other workflow data
    };
    
    console.log('Workflow data:', workflowData);
  };
  
  const handleShare = () => {
    // Logic for sharing the workflow
    console.log('Share workflow');
  };
  
  const handleSettings = () => {
    // Logic for opening settings
    console.log('Open settings');
  };
  
  const handleUndo = () => {
    // Logic for undo
    console.log('Undo');
  };
  
  const handleRedo = () => {
    // Logic for redo
    console.log('Redo');
  };
  
  const handleCredentials = () => {
    // Logic for managing credentials
    console.log('Manage credentials');
  };
  
  return (
    <div className="bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between shadow-sm">
      {/* Left section: Title and controls */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="border-0 font-medium text-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 rounded"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleUndo}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button 
            onClick={handleRedo}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            title="Redo"
          >
            <Redo size={18} />
          </button>
        </div>
      </div>
      
      {/* Center section: Run controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleRun}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md text-white ${
            isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
          } transition-colors`}
        >
          {isRunning ? (
            <>
              <Pause size={16} />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play size={16} />
              <span>Run</span>
            </>
          )}
        </button>
      </div>
      
      {/* Right section: Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleCredentials}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Credentials"
        >
          <KeyIcon size={18} />
        </button>
        <button
          onClick={handleSave}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Save"
        >
          <Save size={18} />
        </button>
        <button
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Share"
        >
          <Share2 size={18} />
        </button>
        <button
          onClick={handleSettings}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Settings"
        >
          <Settings size={18} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Help"
        >
          <HelpCircle size={18} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;