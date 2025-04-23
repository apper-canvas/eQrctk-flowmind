import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

// Initial flow state
const initialState = {
  nodes: [],
  edges: [],
  selectedNode: null,
};

// Create the store
export const useFlowStore = create((set, get) => ({
  // State
  ...initialState,

  // Node Operations
  addNode: (node) => {
    const newNode = {
      id: nanoid(),
      data: { 
        label: node.label,
        type: node.type,
        category: node.category,
        description: node.description,
        // Default properties for the node type
        properties: {
          // Common properties
          name: `${node.label}_${nanoid(4)}`,
          description: '',
          // Type-specific default properties will be added based on node type
          ...getDefaultPropertiesForType(node.type),
        }
      },
      position: node.position,
      type: 'default', // or custom node type
      style: {
        borderColor: getCategoryColor(node.category),
      }
    };
    
    set((state) => ({
      nodes: [...state.nodes, newNode],
      selectedNode: newNode
    }));
    return newNode.id;
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  // Edge Operations
  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (connection) => {
    set((state) => ({
      edges: addEdge(
        { 
          ...connection, 
          id: `e${nanoid()}`,
          animated: true,
          style: { stroke: '#555' },
        }, 
        state.edges
      ),
    }));
  },

  // Selection
  setSelectedNode: (node) => {
    set({ selectedNode: node });
  },

  updateNodeData: (nodeId, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...data,
            },
          };
        }
        return node;
      }),
      // Also update selected node if it's the one being edited
      selectedNode: state.selectedNode?.id === nodeId 
        ? { ...state.selectedNode, data: { ...state.selectedNode.data, ...data } } 
        : state.selectedNode
    }));
  },

  // Reset store
  reset: () => set(initialState),
}));

// Helper functions for node creation
function getCategoryColor(category) {
  const colors = {
    trigger: '#ff9900',
    app: '#00a8ff',
    logic: '#7352ff',
    data: '#00c853',
    ai: '#ff5252',
  };
  return colors[category] || '#888';
}

function getDefaultPropertiesForType(type) {
  // Define default properties for different node types
  const defaultProps = {
    // Triggers
    cron: { schedule: '* * * * *' },
    webhook: { method: 'POST', path: '/webhook' },
    
    // Apps
    slack: { channel: 'general', message: '' },
    discord: { channel: '', message: '' },
    github: { repo: '', action: 'issue' },
    
    // Logic
    if: { condition: '' },
    switch: { value: '', cases: [] },
    merge: { mode: 'append' },
    wait: { duration: 5, unit: 'minutes' },
    
    // Data
    http: { url: '', method: 'GET', headers: {} },
    json: { operation: 'parse' },
    database: { connection: '', query: '' },
    
    // AI
    llm: { 
      model: 'gpt-4',
      prompt: '',
      temperature: 0.7,
      maxTokens: 1000
    },
    agent: { 
      goal: '',
      tools: [],
      memory: true
    },
    embedding: { 
      model: 'text-embedding-3-small',
      text: ''
    },
    vectorSearch: {
      database: '',
      query: '',
      topK: 5
    },
    imageGen: {
      model: 'dall-e-3',
      prompt: '',
      size: '1024x1024'
    },
    speechToText: {
      model: 'whisper-1',
      language: 'en'
    }
  };
  
  return defaultProps[type] || {};
}