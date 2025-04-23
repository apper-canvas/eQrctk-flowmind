import { useState } from 'react';
import { 
  Save, 
  Play, 
  Settings, 
  Code, 
  Sun, 
  Moon, 
  Menu, 
  User, 
  HelpCircle,
  Key,
  Bot
} from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const TopBar = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { workflowName, setWorkflowName } = useFlowStore();
  
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleNameChange = (e) => {
    setWorkflowName(e.target.value);
  };

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 mr-2"
          >
            <Menu size={20} />
          </button>
          
          <div className="font-bold text-xl mr-6 text-blue-600">FlowMind</div>
          
          <div className="flex items-center border-r border-slate-200 dark:border-slate-700 pr-4 mr-4">
            <input
              type="text"
              value={workflowName}
              onChange={handleNameChange}
              className="font-medium text-slate-800 dark:text-slate-200 bg-transparent border-none focus:outline-none focus:ring-0 px-2 py-1 w-48"
              placeholder="Unnamed Workflow"
            />
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="p-1.5 rounded-md text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
              <Save size={18} />
            </button>
            <button className="px-3 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center">
              <Play size={16} className="mr-1" />
              <span>Run</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button className="p-1.5 rounded-md text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
            <Bot size={18} />
          </button>
          <button className="p-1.5 rounded-md text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
            <Key size={18} />
          </button>
          <button className="p-1.5 rounded-md text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
            <Code size={18} />
          </button>
          <button className="p-1.5 rounded-md text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
            <Settings size={18} />
          </button>
          <button 
            className="p-1.5 rounded-md text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="p-1.5 rounded-md text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
            <HelpCircle size={18} />
          </button>
          <button className="ml-2 flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-1">
              <User size={14} className="text-blue-600 dark:text-blue-300" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;