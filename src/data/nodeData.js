import React from 'react';
import { 
  Workflow, 
  MessageSquare, 
  GitBranch, 
  Database, 
  AppWindow, 
  Bot, 
  Clock, 
  Webhook as WebhookIcon, 
  FileJson, 
  Columns, 
  SplitSquareVertical 
} from 'lucide-react';

export const nodeCategories = [
  { id: 'trigger', label: 'Triggers' },
  { id: 'app', label: 'Apps' },
  { id: 'logic', label: 'Logic' },
  { id: 'data', label: 'Data' },
  { id: 'ai', label: 'AI' },
];

export const nodeDefinitions = [
  // Triggers
  {
    type: 'cron',
    label: 'Cron',
    category: 'trigger',
    icon: <Clock size={18} />,
    description: 'Triggers on a schedule',
  },
  {
    type: 'webhook',
    label: 'Webhook',
    category: 'trigger',
    icon: <WebhookIcon size={18} />,
    description: 'Triggers when HTTP request is received',
  },
  
  // Apps
  {
    type: 'slack',
    label: 'Slack',
    category: 'app',
    icon: <MessageSquare size={18} />,
    description: 'Interact with Slack channels and messages',
  },
  {
    type: 'discord',
    label: 'Discord',
    category: 'app',
    icon: <MessageSquare size={18} />,
    description: 'Send and receive Discord messages',
  },
  {
    type: 'github',
    label: 'GitHub',
    category: 'app',
    icon: <GitBranch size={18} />,
    description: 'Manage GitHub issues, PRs, and repositories',
  },
  {
    type: 'webhook-app',
    label: 'Webhook',
    category: 'app',
    icon: <WebhookIcon size={18} />,
    description: 'Send HTTP requests to external services',
  },
  
  // Logic
  {
    type: 'if',
    label: 'IF',
    category: 'logic',
    icon: <SplitSquareVertical size={18} />,
    description: 'Conditional branching based on conditions',
  },
  {
    type: 'switch',
    label: 'Switch',
    category: 'logic',
    icon: <Columns size={18} />,
    description: 'Route to different paths based on value',
  },
  
  // Data
  {
    type: 'http',
    label: 'HTTP Request',
    category: 'data',
    icon: <AppWindow size={18} />,
    description: 'Make external API calls',
  },
  {
    type: 'json',
    label: 'JSON',
    category: 'data',
    icon: <FileJson size={18} />,
    description: 'Parse and manipulate JSON data',
  },
  {
    type: 'database',
    label: 'Database',
    category: 'data',
    icon: <Database size={18} />,
    description: 'Connect to databases like MySQL or MongoDB',
  },
  
  // AI
  {
    type: 'llm',
    label: 'LLM Call',
    category: 'ai',
    icon: <Bot size={18} />,
    description: 'Call language models like GPT-4 or Claude',
  },
  {
    type: 'agent',
    label: 'Agent Runner',
    category: 'ai',
    icon: <Workflow size={18} />,
    description: 'Run an autonomous AI agent with tools',
  },
];