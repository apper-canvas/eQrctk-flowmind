import {
  Zap,
  Apps,
  GitBranch,
  Database,
  Bot,
  BarChart,
  Globe,
  MessageSquare,
  Clock,
  Webhook,
  FileText,
  Mail,
  User,
  Server,
  Layers,
  Workflow,
  Repeat,
  Pause,
  Filter,
  Code,
  ArrowRightLeft,
  Image,
  AudioLines,
  Search,
  BrainCircuit,
} from 'lucide-react';

// Node definitions for the library
export const nodeDefinitions = [
  // Trigger Nodes
  { type: 'webhook', label: 'Webhook', description: 'Trigger on HTTP requests', category: 'trigger' },
  { type: 'cron', label: 'Schedule', description: 'Run at specified intervals', category: 'trigger' },
  { type: 'mail', label: 'Email Trigger', description: 'Trigger on new emails', category: 'trigger' },
  { type: 'subscription', label: 'Event Subscription', description: 'Trigger on external events', category: 'trigger' },
  
  // App Integration Nodes
  { type: 'slack', label: 'Slack', description: 'Send or receive Slack messages', category: 'app' },
  { type: 'discord', label: 'Discord', description: 'Interact with Discord channels', category: 'app' },
  { type: 'github', label: 'GitHub', description: 'Trigger on GitHub events', category: 'app' },
  { type: 'notion', label: 'Notion', description: 'Create or update Notion pages', category: 'app' },
  { type: 'googleSheets', label: 'Google Sheets', description: 'Read or write to spreadsheets', category: 'app' },
  { type: 'salesforce', label: 'Salesforce', description: 'Manage CRM data and operations', category: 'app' },
  
  // Logic Nodes
  { type: 'if', label: 'IF', description: 'Conditional branching', category: 'logic' },
  { type: 'switch', label: 'Switch', description: 'Multi-path branching', category: 'logic' },
  { type: 'merge', label: 'Merge', description: 'Combine multiple inputs', category: 'logic' },
  { type: 'wait', label: 'Wait', description: 'Pause execution for a duration', category: 'logic' },
  { type: 'loop', label: 'Loop', description: 'Iterate over items', category: 'logic' },
  
  // Data Nodes
  { type: 'http', label: 'HTTP Request', description: 'Make API calls', category: 'data' },
  { type: 'mysql', label: 'MySQL', description: 'Execute SQL queries', category: 'data' },
  { type: 'mongodb', label: 'MongoDB', description: 'Query document database', category: 'data' },
  { type: 'transform', label: 'Data Transform', description: 'Format and structure data', category: 'data' },
  { type: 'csv', label: 'CSV', description: 'Parse or create CSV files', category: 'data' },
  
  // AI Nodes
  { type: 'llm', label: 'LLM Call', description: 'Generate text with AI models', category: 'ai' },
  { type: 'agent', label: 'Agent Runner', description: 'Run autonomous AI agent', category: 'ai' },
  { type: 'embedding', label: 'Embedding Generate', description: 'Create vector embeddings', category: 'ai' },
  { type: 'vectorSearch', label: 'Vector Search', description: 'Semantic search in vectors', category: 'ai' },
  { type: 'imageGen', label: 'Image Generation', description: 'Generate images with AI', category: 'ai' },
  { type: 'speechToText', label: 'Speech-to-Text', description: 'Transcribe audio to text', category: 'ai' },
];

// Category definitions with icons and labels
export const nodeCategories = {
  triggers: {
    label: 'Triggers',
    icon: Zap,
    description: 'Start your workflow',
    nodes: nodeDefinitions.filter(node => node.category === 'trigger')
  },
  apps: {
    label: 'Apps',
    icon: Apps,
    description: 'Connect to external services',
    nodes: nodeDefinitions.filter(node => node.category === 'app')
  },
  logic: {
    label: 'Logic',
    icon: GitBranch,
    description: 'Control flow operations',
    nodes: nodeDefinitions.filter(node => node.category === 'logic')
  },
  data: {
    label: 'Data',
    icon: Database,
    description: 'Work with data sources',
    nodes: nodeDefinitions.filter(node => node.category === 'data')
  },
  ai: {
    label: 'AI',
    icon: Bot,
    description: 'Artificial intelligence nodes',
    nodes: nodeDefinitions.filter(node => node.category === 'ai')
  }
};