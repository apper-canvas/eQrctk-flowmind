import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, FileText, MoreHorizontal } from 'lucide-react';

const TabBar = () => {
  const [tabs, setTabs] = useState([
    { id: 'tab1', title: 'My Workflow', active: true },
  ]);
  const [draggedTab, setDraggedTab] = useState(null);
  const tabBarRef = useRef(null);

  // Tab cycling with Tab key
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if Tab key is pressed with a modifier like Ctrl or Alt
      if (e.key === 'Tab' && (e.ctrlKey || e.altKey)) {
        e.preventDefault();
        
        const activeIndex = tabs.findIndex(tab => tab.active);
        if (activeIndex === -1) return;
        
        // Calculate the next tab index (cycling through tabs)
        const nextIndex = (activeIndex + 1) % tabs.length;
        
        // Update tabs to make the next one active
        setTabs(prevTabs => prevTabs.map((tab, index) => ({
          ...tab,
          active: index === nextIndex
        })));
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [tabs]);

  const addNewTab = () => {
    const newTabId = `tab${tabs.length + 1}`;
    setTabs(prevTabs => [
      ...prevTabs.map(tab => ({ ...tab, active: false })),
      { id: newTabId, title: `Workflow ${tabs.length + 1}`, active: true }
    ]);
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    
    // Find the index of the tab to be closed
    const tabIndex = tabs.findIndex(tab => tab.id === id);
    
    // Only proceed if we have more than one tab
    if (tabs.length <= 1) return;
    
    // If we're closing the active tab, make another tab active
    const isActiveTab = tabs[tabIndex].active;
    
    // Remove the tab
    const newTabs = tabs.filter(tab => tab.id !== id);
    
    // If we closed the active tab, make another tab active
    if (isActiveTab && newTabs.length > 0) {
      // Prefer the tab to the left, otherwise the first tab
      const newActiveIndex = Math.max(0, tabIndex - 1);
      newTabs[newActiveIndex] = { ...newTabs[newActiveIndex], active: true };
    }
    
    setTabs(newTabs);
  };

  const activateTab = (id) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => ({
        ...tab,
        active: tab.id === id
      }))
    );
  };

  const handleDragStart = (e, id) => {
    setDraggedTab(id);
    e.dataTransfer.effectAllowed = 'move';
    // Create a ghost image for the dragged tab
    const ghostElement = document.createElement('div');
    ghostElement.textContent = tabs.find(tab => tab.id === id)?.title || '';
    ghostElement.className = 'bg-white p-2 border border-blue-500 rounded opacity-80';
    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, 0, 0);
    setTimeout(() => document.body.removeChild(ghostElement), 0);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    
    if (!draggedTab || draggedTab === id) return;
    
    // Find indices
    const draggedIndex = tabs.findIndex(tab => tab.id === draggedTab);
    const hoverIndex = tabs.findIndex(tab => tab.id === id);
    
    if (draggedIndex === -1 || hoverIndex === -1) return;
    
    // Reorder tabs
    const newTabs = [...tabs];
    const [movedTab] = newTabs.splice(draggedIndex, 1);
    newTabs.splice(hoverIndex, 0, movedTab);
    
    setTabs(newTabs);
  };

  const handleDragEnd = (e) => {
    // Check if the tab was dragged outside the tab bar
    if (tabBarRef.current) {
      const rect = tabBarRef.current.getBoundingClientRect();
      const isOutsideTabBar = 
        e.clientY < rect.top || 
        e.clientY > rect.bottom || 
        e.clientX < rect.left || 
        e.clientX > rect.right;
      
      if (isOutsideTabBar && draggedTab) {
        // Simulate opening a new window with the tab
        // In a real app, you would create a new window and transfer the workflow
        alert(`Tab "${tabs.find(tab => tab.id === draggedTab)?.title}" would open in a new window`);
      }
    }
    
    setDraggedTab(null);
  };

  return (
    <div 
      className="flex items-center bg-gray-100 border-b border-gray-200" 
      ref={tabBarRef}
    >
      <div className="flex-1 flex items-center overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`flex items-center px-4 py-2 border-r border-gray-200 cursor-pointer select-none ${
              tab.active 
                ? 'bg-white border-b-2 border-b-blue-500' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => activateTab(tab.id)}
            draggable
            onDragStart={(e) => handleDragStart(e, tab.id)}
            onDragOver={(e) => handleDragOver(e, tab.id)}
            onDragEnd={handleDragEnd}
          >
            <FileText size={16} className="text-gray-500 mr-2" />
            <span className="truncate max-w-[150px]">{tab.title}</span>
            <button 
              className="ml-2 text-gray-400 hover:text-gray-600"
              onClick={(e) => closeTab(tab.id, e)}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex items-center px-2">
        <button 
          className="p-1 hover:bg-gray-200 rounded"
          onClick={addNewTab}
          title="New Tab"
        >
          <Plus size={20} className="text-gray-600" />
        </button>
        
        <button className="p-1 hover:bg-gray-200 rounded ml-1" title="More Options">
          <MoreHorizontal size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default TabBar;