import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

import TopBar from './components/TopBar/TopBar';
import NodeLibrary from './components/NodeLibrary/NodeLibrary';
import FlowCanvas from './components/Canvas/FlowCanvas';
import PropertyPanel from './components/PropertyPanel/PropertyPanel';
import TabBar from './components/TabBar/TabBar';

const App = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <TopBar />
      <TabBar />
      <div className="flex flex-1 overflow-hidden">
        <ReactFlowProvider>
          <NodeLibrary />
          <div className="flex-1 relative">
            <FlowCanvas />
          </div>
          <PropertyPanel />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default App;