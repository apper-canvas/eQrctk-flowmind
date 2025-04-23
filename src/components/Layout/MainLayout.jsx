import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import NodeLibrary from '../Sidebar/NodeLibrary';
import FlowCanvas from '../Canvas/FlowCanvas';
import InspectorPanel from '../RightPanel/InspectorPanel';
import LogsPanel from '../RightPanel/LogsPanel';
import TabBar from '../TabBar/TabBar';
import { useFlowStore } from '../../store/flowStore';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const [activeRightTab, setActiveRightTab] = useState('inspector'); // 'inspector' or 'logs'
  const selectedNode = useFlowStore(state => state.selectedNode);
  const { addTab, cycleToNextTab } = useFlowStore();

  useEffect(() => {
    // Global keyboard handler for tab management hotkeys
    const handleKeyDown = (e) => {
      // Ctrl+T for new tab
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        addTab();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addTab]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleInspector = () => {
    setIsInspectorOpen(!isInspectorOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      <TopBar toggleSidebar={toggleSidebar} />
      
      <TabBar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Node Library Sidebar */}
        <div 
          className={`${
            isSidebarOpen ? 'w-64' : 'w-0'
          } transition-all duration-300 border-r border-slate-200 dark:border-slate-700 overflow-hidden`}
        >
          <NodeLibrary />
        </div>
        
        {/* Main Canvas Area */}
        <div className="flex-1 overflow-hidden">
          <FlowCanvas />
        </div>
        
        {/* Right Panel (Inspector/Logs) */}
        <div 
          className={`${
            isInspectorOpen ? 'w-80' : 'w-0'
          } transition-all duration-300 border-l border-slate-200 dark:border-slate-700 overflow-hidden`}
        >
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            <button
              className={`flex-1 py-2 text-center ${
                activeRightTab === 'inspector' 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              onClick={() => setActiveRightTab('inspector')}
            >
              Inspector
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeRightTab === 'logs' 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              onClick={() => setActiveRightTab('logs')}
            >
              Logs
            </button>
          </div>
          
          <div className="h-full overflow-auto">
            {activeRightTab === 'inspector' ? (
              <InspectorPanel node={selectedNode} />
            ) : (
              <LogsPanel />
            )}
          </div>
        </div>
      </div>
      
      <Outlet />
    </div>
  );
};

export default MainLayout;