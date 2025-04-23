import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, MoreHorizontal } from 'lucide-react';

// Mock data for initial tabs
const initialTabs = [
  { id: 'tab-1', title: 'My Workflow', active: true },
  { id: 'tab-2', title: 'Customer Journey', active: false }
];

const TabBar = () => {
  const [tabs, setTabs] = useState(initialTabs);
  const [draggedTab, setDraggedTab] = useState(null);
  const tabRefs = useRef({});
  
  // Handle tab click to activate it
  const activateTab = (tabId) => {
    setTabs(tabs.map(tab => ({
      ...tab,
      active: tab.id === tabId
    })));
  };
  
  // Add a new tab
  const addTab = () => {
    const newTab = {
      id: `tab-${Date.now()}`,
      title: `New Workflow ${tabs.length + 1}`,
      active: false
    };
    
    setTabs([...tabs.map(tab => ({ ...tab, active: false })), { ...newTab, active: true }]);
  };
  
  // Close a tab
  const closeTab = (tabId, event) => {
    event.stopPropagation();
    
    // If closing the active tab, activate another one
    const isActiveTab = tabs.find(tab => tab.id === tabId)?.active;
    const remainingTabs = tabs.filter(tab => tab.id !== tabId);
    
    if (isActiveTab && remainingTabs.length > 0) {
      // Activate the next tab, or the last one if closing the last tab
      const tabIndex = tabs.findIndex(tab => tab.id === tabId);
      const nextActiveIndex = tabIndex >= remainingTabs.length ? remainingTabs.length - 1 : tabIndex;
      remainingTabs[nextActiveIndex].active = true;
    }
    
    setTabs(remainingTabs);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle Tab key with Ctrl/Cmd for tab cycling
      if ((e.ctrlKey || e.metaKey) && e.key === 'Tab') {
        e.preventDefault();
        
        // Find the current active tab index
        const activeIndex = tabs.findIndex(tab => tab.active);
        if (activeIndex === -1) return;
        
        // Calculate the next tab index (with wrap-around)
        const nextIndex = e.shiftKey 
          ? (activeIndex - 1 + tabs.length) % tabs.length // go backward with shift
          : (activeIndex + 1) % tabs.length; // go forward
          
        // Activate the next tab
        activateTab(tabs[nextIndex].id);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tabs]);
  
  // Drag and drop functions
  const handleDragStart = (e, tabId) => {
    setDraggedTab(tabId);
    
    // Set drag image
    if (tabRefs.current[tabId]) {
      const rect = tabRefs.current[tabId].getBoundingClientRect();
      const ghostElem = tabRefs.current[tabId].cloneNode(true);
      
      // Style the ghost element
      ghostElem.style.width = `${rect.width}px`;
      ghostElem.style.height = `${rect.height}px`;
      ghostElem.style.opacity = '0.7';
      ghostElem.style.position = 'absolute';
      ghostElem.style.top = '-1000px'; // Hide it
      document.body.appendChild(ghostElem);
      
      // Set the drag ghost image
      e.dataTransfer.setDragImage(ghostElem, rect.width / 2, rect.height / 2);
      
      // Remove ghost element after drag starts
      setTimeout(() => {
        document.body.removeChild(ghostElem);
      }, 0);
    }
  };
  
  const handleDragOver = (e, tabId) => {
    e.preventDefault();
    
    if (draggedTab === null || draggedTab === tabId) return;
    
    // Get positions for insertion
    const draggedIndex = tabs.findIndex(tab => tab.id === draggedTab);
    const targetIndex = tabs.findIndex(tab => tab.id === tabId);
    
    if (draggedIndex === targetIndex) return;
    
    // Reorder the tabs
    const newTabs = [...tabs];
    const [draggedItem] = newTabs.splice(draggedIndex, 1);
    newTabs.splice(targetIndex, 0, draggedItem);
    
    setTabs(newTabs);
  };
  
  const handleDragEnd = (e) => {
    setDraggedTab(null);
    
    // Check if the drop happened outside the tab bar - create new window
    if (e.dataTransfer.dropEffect === 'none') {
      console.log('Tab dragged outside - would create new window in real implementation');
      // In a real implementation, you would:
      // 1. Open a new browser window
      // 2. Pass the tab ID/data to that window
      // 3. Remove the tab from the current window's tabs
    }
  };
  
  return (
    <div className="flex items-center border-b border-gray-200 bg-white h-10 overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          ref={el => tabRefs.current[tab.id] = el}
          className={`flex items-center px-4 py-2 border-r border-gray-200 cursor-pointer ${
            tab.active ? 'bg-blue-50 border-b-2 border-b-blue-500' : 'hover:bg-gray-100'
          } select-none max-w-xs`}
          onClick={() => activateTab(tab.id)}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, tab.id)}
          onDragOver={(e) => handleDragOver(e, tab.id)}
          onDragEnd={handleDragEnd}
        >
          <span className="truncate text-sm">{tab.title}</span>
          <button
            className="ml-2 rounded-full hover:bg-gray-200 p-0.5"
            onClick={(e) => closeTab(tab.id, e)}
          >
            <X size={14} />
          </button>
        </div>
      ))}
      
      <button
        className="flex items-center justify-center p-2 hover:bg-gray-100"
        onClick={addTab}
      >
        <Plus size={16} />
      </button>
      
      {/* Spacer to push actions to the right */}
      <div className="flex-grow"></div>
      
      {/* Tab actions */}
      <button className="p-2 hover:bg-gray-100">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
};

export default TabBar;