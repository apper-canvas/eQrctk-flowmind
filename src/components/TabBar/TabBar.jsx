import { useState, useEffect, useRef } from 'react';
import { Plus, X, Edit, Copy, Trash, MoreHorizontal } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const TabBar = () => {
  const { 
    tabs, 
    activeTabId, 
    addTab, 
    activateTab, 
    closeTab,
    updateTabName,
    reorderTabs,
    cycleToNextTab
  } = useFlowStore();
  
  const [editingTabId, setEditingTabId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [draggedTabId, setDraggedTabId] = useState(null);
  const tabRefs = useRef({});
  
  // Handle keyboard navigation with Tab key
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Tab key + specific modifiers
      if (e.key === 'Tab' && e.altKey) {
        e.preventDefault();
        cycleToNextTab();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cycleToNextTab]);
  
  const startEditingTab = (tabId, currentName, e) => {
    e.stopPropagation();
    setEditingTabId(tabId);
    setEditedName(currentName);
  };
  
  const saveTabName = (tabId) => {
    if (editedName.trim()) {
      updateTabName(tabId, editedName.trim());
    }
    setEditingTabId(null);
  };

  // Drag and drop functionality
  const handleDragStart = (e, tabId) => {
    setDraggedTabId(tabId);
    e.dataTransfer.setData('application/reactflow-tab', tabId);
    e.dataTransfer.effectAllowed = 'move';
    
    // Set a ghost image for dragging
    const draggedTab = tabRefs.current[tabId];
    if (draggedTab) {
      const rect = draggedTab.getBoundingClientRect();
      e.dataTransfer.setDragImage(draggedTab, rect.width / 2, rect.height / 2);
    }
  };

  const handleDragOver = (e, tabId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedTabId && draggedTabId !== tabId) {
      // Highlight potential drop target
      const targetTab = tabRefs.current[tabId];
      if (targetTab) {
        targetTab.classList.add('bg-blue-100', 'dark:bg-blue-900/30');
      }
    }
  };

  const handleDragLeave = (e, tabId) => {
    // Remove highlight
    const targetTab = tabRefs.current[tabId];
    if (targetTab) {
      targetTab.classList.remove('bg-blue-100', 'dark:bg-blue-900/30');
    }
  };

  const handleDrop = (e, targetTabId) => {
    e.preventDefault();
    
    // Remove highlight
    const targetTab = tabRefs.current[targetTabId];
    if (targetTab) {
      targetTab.classList.remove('bg-blue-100', 'dark:bg-blue-900/30');
    }
    
    if (draggedTabId && draggedTabId !== targetTabId) {
      // Reorder tabs in the store
      reorderTabs(draggedTabId, targetTabId);
    }
    
    setDraggedTabId(null);
  };

  const handleDragEnd = (e) => {
    // Check if dragged outside the tab bar (to a new window)
    if (e.dataTransfer.dropEffect === 'none') {
      attemptToOpenInNewWindow(draggedTabId);
    }
    setDraggedTabId(null);
  };

  const attemptToOpenInNewWindow = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      // In a real implementation, you would:
      // 1. Serialize the tab data
      // 2. Open a new window with window.open()
      // 3. Send the data to that window
      // 4. Remove the tab from the current window
      
      // For this demo, we'll show an alert
      alert(`Tab "${tab.name}" would open in a new window`);
      
      // This would be the actual implementation in a production app:
      // const tabData = JSON.stringify(tab);
      // const newWindow = window.open('/workflow', '_blank');
      // newWindow.addEventListener('load', () => {
      //   newWindow.postMessage({ type: 'LOAD_TAB', payload: tabData }, '*');
      // });
      // closeTab(tabId);
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center">
      <div className="flex-1 overflow-x-auto scrollbar-none flex items-center">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            ref={el => tabRefs.current[tab.id] = el}
            className={`
              flex items-center px-3 py-2 border-r border-slate-200 dark:border-slate-700 cursor-pointer
              select-none transition-colors duration-150
              ${activeTabId === tab.id 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}
              ${draggedTabId === tab.id ? 'opacity-50' : 'opacity-100'}
            `}
            onClick={() => activateTab(tab.id)}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, tab.id)}
            onDragOver={(e) => handleDragOver(e, tab.id)}
            onDragLeave={(e) => handleDragLeave(e, tab.id)}
            onDrop={(e) => handleDrop(e, tab.id)}
            onDragEnd={handleDragEnd}
          >
            {editingTabId === tab.id ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur={() => saveTabName(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveTabName(tab.id);
                  if (e.key === 'Escape') setEditingTabId(null);
                }}
                onClick={(e) => e.stopPropagation()}
                className="px-1 py-0.5 w-32 text-sm bg-white dark:bg-slate-600 border border-blue-500 rounded focus:outline-none"
                autoFocus
              />
            ) : (
              <span className="mr-2 text-sm truncate max-w-[160px]">{tab.name}</span>
            )}
            
            <div className="flex items-center ml-1">
              {!editingTabId && (
                <button
                  className="p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  onClick={(e) => startEditingTab(tab.id, tab.name, e)}
                >
                  <Edit size={12} />
                </button>
              )}
              <button
                className="p-0.5 ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center px-2 border-l border-slate-200 dark:border-slate-700">
        <button
          className="p-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
          onClick={() => addTab()}
          title="New Tab (Ctrl+T)"
        >
          <Plus size={16} />
        </button>
        
        <button
          className="p-1.5 ml-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
          title="Tab options"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default TabBar;