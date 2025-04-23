import React from 'react';
import TabBar from './components/TabBar/TabBar';
import TopBar from './components/TopBar/TopBar';
import NodeLibrary from './components/NodeLibrary/NodeLibrary';
import FlowCanvas from './components/Canvas/FlowCanvas';
import Inspector from './components/Inspector/Inspector';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <TabBar />
      <TopBar />
      
      <div className="flex-1 flex overflow-hidden">
        <NodeLibrary />
        
        <div className="flex-1 flex">
          <div className="flex-1 relative">
            <FlowCanvas />
          </div>
          
          <Inspector />
        </div>
      </div>
    </div>
  );
}

export default App;