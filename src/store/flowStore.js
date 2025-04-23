import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

// Create and export the store hook directly
export const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nextNodeId: 1,
  selectedNode: null,
  
  // Nodes actions
  setNodes: (nodes) => set({ nodes }),
  
  addNode: (nodeData, position) => {
    const id = `node_${get().nextNodeId}`;
    
    const newNode = {
      id,
      type: nodeData.type || 'default',
      position,
      data: { 
        ...nodeData,
        label: nodeData.label || 'Node',
      },
    };
    
    set((state) => ({ 
      nodes: [...state.nodes, newNode],
      nextNodeId: state.nextNodeId + 1,
      selectedNode: newNode
    }));
    
    return id;
  },
  
  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },
  
  // Edges actions
  setEdges: (edges) => set({ edges }),
  
  addEdge: (connection) => {
    const newEdge = {
      id: `edge-${nanoid()}`,
      ...connection,
    };
    
    set((state) => ({
      edges: addEdge(newEdge, state.edges),
    }));
  },
  
  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },
  
  // Selected node actions
  setSelectedNode: (node) => set({ selectedNode: node }),
  
  updateSelectedNode: (data) => {
    set((state) => {
      if (!state.selectedNode) return state;
      
      const updatedNodes = state.nodes.map((node) => {
        if (node.id === state.selectedNode.id) {
          return {
            ...node,
            data: { ...node.data, ...data },
          };
        }
        return node;
      });
      
      return {
        nodes: updatedNodes,
        selectedNode: {
          ...state.selectedNode,
          data: { ...state.selectedNode.data, ...data },
        },
      };
    });
  },
  
  // Clear the entire canvas
  clearCanvas: () => set({ nodes: [], edges: [], nextNodeId: 1, selectedNode: null }),
}));