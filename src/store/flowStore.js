import { create } from 'zustand';
import { nanoid } from 'nanoid';

// Create the flow store with zustand
export const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  history: [],
  historyIndex: -1,

  addNode: (nodeData) => {
    const id = nanoid(6);
    const newNode = {
      id,
      type: nodeData.type || 'default',
      position: nodeData.position || { x: 250, y: 250 },
      data: {
        label: nodeData.label || 'New Node',
        ...nodeData,
      },
    };

    set((state) => {
      const newState = {
        nodes: [...state.nodes, newNode],
        selectedNodeId: id,
      };
      return newState;
    });
    
    get().saveHistory();
    return id;
  },

  updateNode: (id, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) => 
        node.id === id 
          ? { ...node, data: { ...node.data, ...data } } 
          : node
      ),
    }));
    get().saveHistory();
  },

  deleteNode: (id) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    }));
    get().saveHistory();
  },

  addEdge: (edge) => {
    const newEdge = {
      ...edge,
      id: `${edge.source}-${edge.target}`,
    };
    
    set((state) => ({
      edges: [...state.edges, newEdge],
    }));
    get().saveHistory();
  },

  deleteEdge: (id) => {
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== id),
    }));
    get().saveHistory();
  },

  setSelectedNode: (nodeId) => {
    set({ selectedNodeId: nodeId });
  },

  updateNodePosition: (nodeId, position) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, position } : node
      ),
    }));
  },

  clearSelection: () => {
    set({ selectedNodeId: null });
  },

  // History management
  saveHistory: () => {
    const { nodes, edges, history, historyIndex } = get();
    const currentState = { nodes: [...nodes], edges: [...edges] };
    
    // If we're not at the end of history, truncate it
    const newHistory = history.slice(0, historyIndex + 1);
    
    set({
      history: [...newHistory, currentState],
      historyIndex: historyIndex + 1,
    });
  },

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      set({
        nodes: [...prevState.nodes],
        edges: [...prevState.edges],
        historyIndex: historyIndex - 1,
      });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      set({
        nodes: [...nextState.nodes],
        edges: [...nextState.edges],
        historyIndex: historyIndex + 1,
      });
    }
  },

  // For debugging
  getState: () => {
    return {
      nodes: get().nodes,
      edges: get().edges,
      selectedNodeId: get().selectedNodeId,
    };
  },
}));

export default useFlowStore;