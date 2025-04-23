import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import useFlowStore from '../../store/flowStore';
import { nanoid } from 'nanoid';

const TabBar = () => {
  const { 
    flows, 
    activeFlowId, 
    setActiveFlow, 
    createFlow, 
    removeFlow,
    updateFlowOrder
  } = useFlowStore();
  
  const [draggedTabId, setDraggedTabId] = useState(null);
  const [dropIndicatorPos, setDropIndicatorPos] = useState(null);

  // Handle keyboard navigation through tabs
  useEffect(() => {
    const handleTabKeypress = (e) => {
      // Only handle when Tab key is pressed with no modifiers
      if (e.key === 'Tab' && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        
        // Find current active tab index
        const currentIndex = flows.findIndex(flow => flow.id === activeFlowId);
        
        // Calculate next tab index (cycle through tabs)
        const nextIndex = (currentIndex + 1) % flows.length;
        
        // Set the next tab as active
        setActiveFlow(flows[nextIndex].id);
      }
    };
    
    window.addEventListener('keydown', handleTabKeypress);
    return () => {
      window.removeEventListener('keydown', handleTabKeypress);
    };
  }, [flows, activeFlowId, setActiveFlow]);

  const handleAddTab = () => {
    const newFlowId = nanoid();
    createFlow(newFlowId, `Flow ${flows.length + 1}`);
    setActiveFlow(newFlowId);
  };

  const handleCloseTab = (e, flowId) => {
    e.stopPropagation();
    removeFlow(flowId);
    
    // If we're closing the active tab, activate another one
    if (flowId === activeFlowId && flows.length > 1) {
      const index = flows.findIndex(flow => flow.id === flowId);
      const newActiveIndex = index === 0 ? 1 : index - 1;
      setActiveFlow(flows[newActiveIndex].id);
    }
  };

  const handleDragStart = (e, flowId, index) => {
    setDraggedTabId(flowId);
    e.dataTransfer.effectAllowed = 'move';
    // Store the tab index to know which tab is being dragged
    e.dataTransfer.setData('text/plain', index);
    
    // Create a ghost image
    const ghostElem = e.target.cloneNode(true);
    ghostElem.style.opacity = '0.5';
    ghostElem.style.position = 'absolute';
    ghostElem.style.top = '-1000px';
    document.body.appendChild(ghostElem);
    e.dataTransfer.setDragImage(ghostElem, 0, 0);
    
    // Clean up the ghost element after a delay
    setTimeout(() => {
      document.body.removeChild(ghostElem);
    }, 0);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    // Calculate whether to show indicator before or after the tab
    const tab = e.currentTarget;
    const tabRect = tab.getBoundingClientRect();
    const dragX = e.clientX;
    
    // Show indicator before or after tab based on mouse position
    if (dragX < tabRect.left + tabRect.width / 2) {
      setDropIndicatorPos({ index, position: 'before' });
    } else {
      setDropIndicatorPos({ index, position: 'after' });
    }
  };

  const handleDragLeave = () => {
    // Only clear indicator if we're not entering another valid drop target
    setTimeout(() => {
      if (!document.querySelector(':hover.tab-item')) {
        setDropIndicatorPos(null);
      }
    }, 50);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    
    if (sourceIndex === targetIndex) {
      setDropIndicatorPos(null);
      setDraggedTabId(null);
      return;
    }
    
    // Adjust target index based on drop position
    let finalTargetIndex = targetIndex;
    if (dropIndicatorPos?.position === 'after') {
      finalTargetIndex++;
    }
    
    // Account for removing the item before inserting it
    if (sourceIndex < finalTargetIndex) {
      finalTargetIndex--;
    }
    
    // Reorder the flows
    const newFlows = [...flows];
    const [movedFlow] = newFlows.splice(sourceIndex, 1);
    newFlows.splice(finalTargetIndex, 0, movedFlow);
    
    // Update the flow order
    updateFlowOrder(newFlows);
    
    // Reset drag state
    setDropIndicatorPos(null);
    setDraggedTabId(null);
  };

  const handleDragEnd = () => {
    setDropIndicatorPos(null);
    setDraggedTabId(null);
  };

  return (
    <div className="flex bg-gray-800 border-b border-gray-700 h-10">
      <div className="flex-1 flex overflow-x-auto">
        {flows.map((flow, index) => {
          const isActive = flow.id === activeFlowId;
          const isDragged = flow.id === draggedTabId;
          
          return (
            <div 
              key={flow.id}
              className={`tab-item relative flex items-center px-4 py-2 text-sm cursor-pointer select-none
                ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}
                ${isDragged ? 'opacity-50' : 'opacity-100'}
                ${dropIndicatorPos?.index === index && dropIndicatorPos?.position === 'before' ? 'border-l-2 border-blue-500' : ''}
                ${dropIndicatorPos?.index === index && dropIndicatorPos?.position === 'after' ? 'border-r-2 border-blue-500' : ''}
              `}
              onClick={() => setActiveFlow(flow.id)}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, flow.id, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <span className="truncate max-w-xs">{flow.name}</span>
              {flows.length > 1 && (
                <button 
                  className="ml-2 text-gray-500 hover:text-white focus:outline-none"
                  onClick={(e) => handleCloseTab(e, flow.id)}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center px-2">
        <button 
          className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-white focus:outline-none"
          onClick={handleAddTab}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default TabBar;