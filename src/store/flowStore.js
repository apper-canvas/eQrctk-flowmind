import { create } from 'zustand';
import { nanoid } from 'nanoid';

const defaultNode = {
  id: '1',
  type: 'default',
  position: { x: 250, y: 100 },
  data: { label: 'Default Node' }
};

const defaultEdge = {
  id: 'e1-2',
  source: '1',
  target: '2',
  animated: true
};

const initialFlow = {
  id: nanoid(),
  name: 'Flow 1',
  nodes: [defaultNode],
  edges: []
};

const useFlowStore = create((set, get) => ({
  flows: [initialFlow],
  activeFlowId: initialFlow.id,
  
  // Flow operations
  setActiveFlow: (flowId) => {
    set({ activeFlowId: flowId });
  },
  
  createFlow: (id, name = 'New Flow') => {
    const newFlow = {
      id,
      name,
      nodes: [{ ...defaultNode, id: nanoid() }],
      edges: []
    };
    
    set(state => ({
      flows: [...state.flows, newFlow]
    }));
  },
  
  removeFlow: (flowId) => {
    set(state => ({
      flows: state.flows.filter(flow => flow.id !== flowId)
    }));
  },
  
  updateFlowName: (flowId, name) => {
    set(state => ({
      flows: state.flows.map(flow => 
        flow.id === flowId ? { ...flow, name } : flow
      )
    }));
  },
  
  updateFlowOrder: (newFlows) => {
    set({ flows: newFlows });
  },
  
  // Node & edge operations for active flow
  getActiveFlow: () => {
    const { flows, activeFlowId } = get();
    return flows.find(flow => flow.id === activeFlowId);
  },
  
  getNodes: () => {
    const activeFlow = get().getActiveFlow();
    return activeFlow ? activeFlow.nodes : [];
  },
  
  getEdges: () => {
    const activeFlow = get().getActiveFlow();
    return activeFlow ? activeFlow.edges : [];
  },
  
  setNodes: (nodes) => {
    set(state => ({
      flows: state.flows.map(flow => 
        flow.id === state.activeFlowId 
          ? { ...flow, nodes } 
          : flow
      )
    }));
  },
  
  setEdges: (edges) => {
    set(state => ({
      flows: state.flows.map(flow => 
        flow.id === state.activeFlowId 
          ? { ...flow, edges } 
          : flow
      )
    }));
  },
  
  onNodesChange: (changes) => {
    const nodes = get().getNodes();
    // Apply changes to nodes
    set(state => ({
      flows: state.flows.map(flow => 
        flow.id === state.activeFlowId 
          ? { 
              ...flow,
              nodes: applyNodeChanges(changes, nodes) 
            } 
          : flow
      )
    }));
  },
  
  onEdgesChange: (changes) => {
    const edges = get().getEdges();
    // Apply changes to edges
    set(state => ({
      flows: state.flows.map(flow => 
        flow.id === state.activeFlowId 
          ? { 
              ...flow,
              edges: applyEdgeChanges(changes, edges) 
            } 
          : flow
      )
    }));
  },
  
  onConnect: (connection) => {
    const edges = get().getEdges();
    // Add new connection
    set(state => ({
      flows: state.flows.map(flow => 
        flow.id === state.activeFlowId 
          ? { 
              ...flow,
              edges: addEdge({ ...connection, animated: true }, edges) 
            } 
          : flow
      )
    }));
  },
  
  addNode: (node) => {
    const nodes = get().getNodes();
    set(state => ({
      flows: state.flows.map(flow => 
        flow.id === state.activeFlowId 
          ? { 
              ...flow, 
              nodes: [...nodes, { ...node, id: node.id || nanoid() }] 
            } 
          : flow
      )
    }));
  }
}));

// Helper functions to implement ReactFlow change operations
function applyNodeChanges(changes, nodes) {
  return changes.reduce((acc, change) => {
    switch (change.type) {
      case 'add':
        return [...acc, change.item];
      case 'remove':
        return acc.filter((node) => node.id !== change.id);
      case 'position':
        return acc.map((node) => {
          if (node.id === change.id) {
            return {
              ...node,
              position: change.position,
            };
          }
          return node;
        });
      case 'select':
        return acc.map((node) => {
          if (node.id === change.id) {
            return {
              ...node,
              selected: change.selected,
            };
          }
          return node;
        });
      default:
        return acc;
    }
  }, nodes);
}

function applyEdgeChanges(changes, edges) {
  return changes.reduce((acc, change) => {
    switch (change.type) {
      case 'add':
        return [...acc, change.item];
      case 'remove':
        return acc.filter((edge) => edge.id !== change.id);
      case 'select':
        return acc.map((edge) => {
          if (edge.id === change.id) {
            return {
              ...edge,
              selected: change.selected,
            };
          }
          return edge;
        });
      default:
        return acc;
    }
  }, edges);
}

function addEdge(edgeParams, edges) {
  // Create a new edge with a unique ID if not provided
  const edge = {
    ...edgeParams,
    id: edgeParams.id || `${edgeParams.source}-${edgeParams.target}`
  };
  return [...edges, edge];
}

export default useFlowStore;