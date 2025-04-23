import { useState } from 'react';
import { Plus, X, Edit, Copy, Trash, MoreHorizontal } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const TabBar = () => {
  const { 
    tabs, 
    activeTabId, 
    addTab, 
    activateTab, 
    closeTab,
    updateTabName
  } = useFlowStore();
  
  const [editingTabId, setEditingTabId] = useState(null);
  const [editedName, setEditedName] = useState('');
  
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

  return (
    <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center">
      <div className="flex-1 overflow-x-auto flex items-center">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`
              flex items-center px-3 py-2 border-r border-slate-200 dark:border-slate-700 cursor-pointer
              ${activeTabId === tab.id 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}
            `}
            onClick={() => activateTab(tab.id)}
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
      
      <div className="flex items-center px-2">
        <button
          className="p-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
          onClick={() => addTab()}
        >
          <Plus size={16} />
        </button>
        
        <button
          className="p-1.5 ml-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default TabBar;