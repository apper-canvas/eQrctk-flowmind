import { create } from 'zustand';
import { 
  addEdge, 
  applyEdgeChanges, 
  applyNodeChanges,
  MarkerType
} from 'reactflow';
import { nanoid } from 'nanoid';
import { nodeDefinitions } from '../utils/nodeData';

const initialTabs = [
  { id: 'tab-1', name: 'Main Workflow', nodes: [], edges: [] }
];

export const useFlowStore = create((set, get) => ({
  // Workflow data
  workflowName: 'Untitled Workflow',
  workflowDescription: '',
  
  // Tab management
  tabs: initialTabs,
  activeTabId: 'tab-1',
  
  // Selected elements
  selectedNode: null,
  
  // Current workflow elements (derived from active tab)
  get nodes() {
    const activeTab = get().tabs.find(tab => tab.id === get().activeTabId);
    return activeTab ? activeTab.nodes : [];
  },
  
  get edges() {
    const activeTab = get().tabs.find(tab => tab.id === get().activeTabId);
    return activeTab ? activeTab.edges : [];
  },
  
  // Tab actions
  addTab: () => set(state => {
    const id = `tab-${nanoid(6)}`;
    const newTabs = [...state.tabs, { 
      id, 
      name: `Workflow ${state.tabs.length + 1}`,
      nodes: [],
      edges: []
    }];
    
    return { 
      tabs: newTabs,
      activeTabId: id
    };
  }),
  
  activateTab: (tabId) => set({ activeTabId: tabId }),
  
  closeTab: (tabId) => set(state => {
    // Don't close if this is the last tab
    if (state.tabs.length <= 1) return state;
    
    const tabIndex = state.tabs.findIndex(tab => tab.id === tabId);
    const newTabs = state.tabs.filter(tab => tab.id !== tabId);
    
    // If closing the active tab, switch to another one
    let newActiveTabId = state.activeTabId;
    if (tabId === state.activeTabId) {
      // Try to activate the tab to the left, or the first one if no left tab
      newActiveTabId = newTabs[tabIndex > 0 ? tabIndex - 1 : 0]?.id;
    }
    
    return {
      tabs: newTabs,
      activeTabId: newActiveTabId
    };
  }),
  
  updateTabName: (tabId, newName) => set(state => ({
    tabs: state.tabs.map(tab => 
      tab.id === tabId ? { ...tab, name: newName } : tab
    )
  })),
  
  // Workflow metadata actions
  setWorkflowName: (name) => set({ workflowName: name }),
  setWorkflowDescription: (description) => set({ workflowDescription: description }),
  
  // Node actions
  onNodesChange: (changes) => set(state => {
    const updatedTabs = state.tabs.map(tab => {
      if (tab.id === state.activeTabId) {
        return {
          ...tab,
          nodes: applyNodeChanges(changes, tab.nodes)
        };
      }
      return tab;
    });
    
    return { tabs: updatedTabs };
  }),
  
  onEdgesChange: (changes) => set(state => {
    const updatedTabs = state.tabs.map(tab => {
      if (tab.id === state.activeTabId) {
        return {
          ...tab,
          edges: applyEdgeChanges(changes, tab.edges)
        };
      }
      return tab;
    });
    
    return { tabs: updatedTabs };
  }),
  
  onConnect: (connection) => set(state => {
    const newEdge = {
      ...connection,
      id: `edge-${nanoid(6)}`,
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#60a5fa' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#60a5fa',
      },
    };
    
    const updatedTabs = state.tabs.map(tab => {
      if (tab.id === state.activeTabId) {
        return {
          ...tab,
          edges: addEdge(newEdge, tab.edges)
        };
      }
      return tab;
    });
    
    return { tabs: updatedTabs };
  }),
  
  // Node selection
  setSelectedNode: (node) => set({ selectedNode: node }),
  
  onNodeClick: (event, node) => set({ selectedNode: node }),
  
  // Add node to canvas from library
  addNode: (type, category, position) => set(state => {
    const definition = nodeDefinitions.find(def => def.type === type) || {
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      description: 'Custom node',
      category: category || 'default'
    };
    
    const newNode = {
      id: `node-${nanoid(6)}`,
      type,
      position,
      data: {
        label: definition.label,
        description: definition.description,
        version: '1.0.0',
        fields: {},
      }
    };
    
    const updatedTabs = state.tabs.map(tab => {
      if (tab.id === state.activeTabId) {
        return {
          ...tab,
          nodes: [...tab.nodes, newNode]
        };
      }
      return tab;
    });
    
    return { 
      tabs: updatedTabs,
      selectedNode: newNode
    };
  }),
  
  // Update node data (used by Inspector)
  updateNodeData: (nodeId, newData) => set(state => {
    const updatedTabs = state.tabs.map(tab => {
      if (tab.id === state.activeTabId) {
        return {
          ...tab,
          nodes: tab.nodes.map(node => 
            node.id === nodeId 
              ? { ...node, data: newData } 
              : node
          )
        };
      }
      return tab;
    });
    
    // Also update the selected node if it's the one being modified
    let updatedSelectedNode = state.selectedNode;
    if (state.selectedNode && state.selectedNode.id === nodeId) {
      updatedSelectedNode = {
        ...state.selectedNode,
        data: newData
      };
    }
    
    return { 
      tabs: updatedTabs,
      selectedNode: updatedSelectedNode
    };
  }),
}));