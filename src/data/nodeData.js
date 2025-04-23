import { 
  AppWindow, // Changed from non-existent 'Apps' to AppWindow
  Zap, 
  CircuitBoard, 
  Database, 
  BrainCircuit,
  Slack, 
  Github, 
  FileText,
  Mail,
  MessageSquare,
  Globe
} from 'lucide-react';

// Node definitions array with all available nodes
export const nodeDefinitions = [
  // Triggers
  {
    type: 'webhook',
    label: 'Webhook',
    description: 'Receives HTTP requests to trigger workflows',
    category: 'trigger',
    icon: <Globe size={16} />
  },
  {
    type: 'cron',
    label: 'Cron Scheduler',
    description: 'Schedule workflows based on time intervals',
    category: 'trigger',
    icon: <Zap size={16} />
  },
  {
    type: 'email-trigger',
    label: 'Email Trigger',
    description: 'Trigger workflow when emails are received',
    category: 'trigger',
    icon: <Mail size={16} />
  },
  
  // Apps
  {
    type: 'webhook',
    label: 'Webhook',
    description: 'Create and manage webhooks for external systems',
    category: 'app',
    icon: <Globe size={16} />
  },
  {
    type: 'slack',
    label: 'Slack',
    description: 'Send messages and interact with Slack',
    category: 'app',
    icon: <Slack size={16} />
  },
  {
    type: 'discord',
    label: 'Discord',
    description: 'Send messages and interact with Discord',
    category: 'app',
    icon: <MessageSquare size={16} />
  },
  {
    type: 'github',
    label: 'GitHub',
    description: 'Interact with GitHub repositories and issues',
    category: 'app',
    icon: <Github size={16} />
  },
  
  // Logic
  {
    type: 'if',
    label: 'IF Condition',
    description: 'Branch workflow based on conditions',
    category: 'logic',
    icon: <CircuitBoard size={16} />
  },
  {
    type: 'switch',
    label: 'Switch',
    description: 'Multi-branch conditions based on values',
    category: 'logic',
    icon: <CircuitBoard size={16} />
  },
  {
    type: 'loop',
    label: 'Loop',
    description: 'Iterate over arrays or repeat actions',
    category: 'logic',
    icon: <CircuitBoard size={16} />
  },
  
  // Data
  {
    type: 'http-request',
    label: 'HTTP Request',
    description: 'Make HTTP requests to external APIs',
    category: 'data',
    icon: <Database size={16} />
  },
  {
    type: 'csv',
    label: 'CSV Parser',
    description: 'Parse and process CSV data',
    category: 'data',
    icon: <FileText size={16} />
  },
  {
    type: 'data-transform',
    label: 'Data Transform',
    description: 'Transform data between different formats',
    category: 'data',
    icon: <Database size={16} />
  },
  
  // AI
  {
    type: 'llm-call',
    label: 'LLM Call',
    description: 'Make calls to language models like GPT-4',
    category: 'ai',
    icon: <BrainCircuit size={16} />
  },
  {
    type: 'agent-runner',
    label: 'Agent Runner',
    description: 'Run an AI agent with goals and tools',
    category: 'ai',
    icon: <BrainCircuit size={16} />
  },
  {
    type: 'image-gen',
    label: 'Image Generator',
    description: 'Generate images using AI models',
    category: 'ai',
    icon: <BrainCircuit size={16} />
  }
];