import React, { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

// Layout components
import TabBar from './components/TabBar/TabBar';
import TopBar from './components/TopBar/TopBar';
import NodeLibrary from './components/NodeLibrary/NodeLibrary';
import PropertyPanel from './components/PropertyPanel/PropertyPanel';
import FlowCanvas from './components/Canvas/FlowCanvas';

const App = () => {
  const [showNodeLibrary, setShowNodeLibrary] = useState(true);
  const [showPropertyPanel, setShowPropertyPanel] = useState(true);

  const toggleNodeLibrary = () => {
    setShowNodeLibrary(!showNodeLibrary);
  };

  const togglePropertyPanel = () => {
    setShowPropertyPanel(!showPropertyPanel);
  };

  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {/* Top bar with workflow controls */}
        <TopBar
          onToggleNodeLibrary={toggleNodeLibrary}
          onTogglePropertyPanel={togglePropertyPanel}
        />
        
        {/* Tabs for multiple workflows */}
        <TabBar />
        
        {/* Main content area with sidebars and canvas */}
        <div className="flex flex-1 overflow-hidden">
          {/* Node library sidebar */}
          {showNodeLibrary && (
            <div className="w-72 flex-shrink-0 border-r dark:border-gray-700 bg-white dark:bg-gray-900 overflow-y-auto">
              <NodeLibrary />
            </div>
          )}
          
          {/* Main flow canvas area */}
          <div className="flex-grow bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <FlowCanvas />
          </div>
          
          {/* Properties panel sidebar */}
          {showPropertyPanel && (
            <div className="w-80 flex-shrink-0">
              <PropertyPanel />
            </div>
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default App;