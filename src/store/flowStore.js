import { create } from 'zustand';
import { nanoid } from 'nanoid';

export const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  nodeCount: {},
  tabIndex: 0,
  tabs: [{ id: '1', name: 'Flow 1' }],

  // Add node to the canvas
  addNode: (nodeType, position, data = {}) => {
    const { nodeCount } = get();
    
    // Track count of each node type to create unique IDs
    const count = (nodeCount[nodeType] || 0) + 1;
    
    const newNode = {
      id: `${nodeType}-${count}`,
      type: 'default',
      position,
      data: {
        ...data,
        nodeType,
        label: `${data.label || nodeType} ${count}`
      }
    };
    
    set(state => ({
      nodes: [...state.nodes, newNode],
      nodeCount: {
        ...state.nodeCount,
        [nodeType]: count
      }
    }));
    
    return newNode;
  },

  // Connect two nodes with an edge
  addEdge: (params) => {
    const edge = {
      id: nanoid(),
      ...params
    };
    
    set(state => ({
      edges: [...state.edges, edge]
    }));
  },

  // Update node positions after drag
  updateNodePositions: (nodes) => {
    set({ nodes });
  },

  // Remove a node
  removeNode: (nodeId) => {
    set(state => ({
      nodes: state.nodes.filter(node => node.id !== nodeId),
      // Also remove any connected edges
      edges: state.edges.filter(
        edge => edge.source !== nodeId && edge.target !== nodeId
      )
    }));
  },

  // Remove an edge
  removeEdge: (edgeId) => {
    set(state => ({
      edges: state.edges.filter(edge => edge.id !== edgeId)
    }));
  },

  // Select a node to show in inspector
  setSelectedNode: (node) => {
    set({ selectedNode: node });
  },

  // Update the nodes
  setNodes: (nodes) => {
    set({ nodes });
  },

  // Update the edges
  setEdges: (edges) => {
    set({ edges });
  },

  // Tab management
  addTab: () => {
    const tabCount = get().tabs.length + 1;
    const newTab = { id: nanoid(), name: `Flow ${tabCount}` };
    set(state => ({
      tabs: [...state.tabs, newTab],
      tabIndex: state.tabs.length // Set to new tab
    }));
  },

  removeTab: (tabId) => {
    set(state => {
      const newTabs = state.tabs.filter(tab => tab.id !== tabId);
      let newIndex = state.tabIndex;
      
      // Adjust tab index if needed
      if (newTabs.length <= newIndex) {
        newIndex = Math.max(0, newTabs.length - 1);
      }
      
      return {
        tabs: newTabs,
        tabIndex: newIndex
      };
    });
  },

  setTabIndex: (index) => {
    set({ tabIndex: index });
  },

  // Reorder tabs
  reorderTabs: (dragIndex, hoverIndex) => {
    set(state => {
      const newTabs = [...state.tabs];
      const draggedTab = newTabs[dragIndex];
      
      // Remove the dragged tab
      newTabs.splice(dragIndex, 1);
      // Insert it at the new position
      newTabs.splice(hoverIndex, 0, draggedTab);
      
      // Adjust the tabIndex if needed
      let newTabIndex = state.tabIndex;
      if (state.tabIndex === dragIndex) {
        newTabIndex = hoverIndex;
      } else if (
        (dragIndex < state.tabIndex && hoverIndex >= state.tabIndex) ||
        (dragIndex > state.tabIndex && hoverIndex <= state.tabIndex)
      ) {
        // Adjust index when tabs are reordered around the current tab
        newTabIndex = dragIndex < hoverIndex ? state.tabIndex - 1 : state.tabIndex + 1;
      }
      
      return {
        tabs: newTabs,
        tabIndex: newTabIndex
      };
    });
  }
}));