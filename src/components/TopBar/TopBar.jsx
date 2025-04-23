import { useState } from 'react';
import { 
  Save, 
  Play, 
  Settings, 
  HelpCircle, 
  Moon, 
  Sun,
  Zap
} from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const TopBar = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);
  const activeFlow = useFlowStore(state => state.getActiveFlow());
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-2 flex items-center justify-between">
      {/* Left side - App controls */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
          aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <div className="flex items-center">
          <div className="bg-blue-500 text-white p-1 rounded mr-2">
            <Zap size={20} />
          </div>
          <span className="font-bold text-lg">WorkflowBuilder</span>
        </div>
      </div>
      
      {/* Center - Workflow Title */}
      <div className="flex items-center">
        <input 
          type="text" 
          value={activeFlow ? activeFlow.name : "Untitled Workflow"}
          className="text-center font-medium bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none px-2 py-1"
        />
      </div>
      
      {/* Right side - Actions */}
      <div className="flex items-center space-x-2">
        <button className="text-slate-600 dark:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md flex items-center">
          <Save size={18} className="mr-1" />
          <span className="hidden sm:inline">Save</span>
        </button>
        
        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md flex items-center transition-colors">
          <Play size={18} className="mr-1" />
          <span>Run</span>
        </button>
        
        <button className="text-slate-600 dark:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
          <Settings size={18} />
        </button>
        
        <button className="text-slate-600 dark:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
          <HelpCircle size={18} />
        </button>
        
        <button 
          onClick={toggleDarkMode}
          className="text-slate-600 dark:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
};

export default TopBar;