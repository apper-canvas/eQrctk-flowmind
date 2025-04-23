import { create } from 'zustand';
import { nanoid } from 'nanoid';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge
} from 'reactflow';

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

export const useFlowStore = create((set, get) => ({
  flows: [initialFlow],
  activeFlowId: initialFlow.id,
  selectedNode: null,
  
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
  
  // Tab operations
  addTab: () => {
    const newId = nanoid();
    const newName = `Flow ${get().flows.length + 1}`;
    get().createFlow(newId, newName);
    get().setActiveFlow(newId);
  },
  
  cycleToNextTab: () => {
    const { flows, activeFlowId } = get();
    const currentIndex = flows.findIndex(flow => flow.id === activeFlowId);
    const nextIndex = (currentIndex + 1) % flows.length;
    set({ activeFlowId: flows[nextIndex].id });
  },
  
  // Node & edge operations for active flow
  getActiveFlow: () => {
    const { flows, activeFlowId } = get();
    return flows.find(flow => flow.id === activeFlowId);
  },
  
  nodes: [],
  edges: [],
  
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
  
  addNode: (type, category, position) => {
    const nodes = get().getNodes();
    const nodeId = nanoid();
    
    const newNode = {
      id: nodeId,
      type: type || 'default',
      position: position || { x: 250, y: 100 },
      data: {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        category: category || 'default',
        description: `This is a ${type} node`,
        version: '1.0',
        fields: {}
      }
    };
    
    set(state => ({
      flows: state.flows.map(flow => 
        flow.id === state.activeFlowId 
          ? { 
              ...flow, 
              nodes: [...nodes, newNode] 
            } 
          : flow
      )
    }));
  },

  onNodeClick: (event, node) => {
    console.log('Node clicked:', node);
    set({ selectedNode: node });
  }
}));