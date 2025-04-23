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
  SplitSquareVertical,
  Mail,
  User,
  Server,
  Layers,
  Repeat,
  Pause,
  Filter,
  Code,
  ArrowRightLeft,
  Image,
  AudioLines,
  Search,
  BrainCircuit
} from 'lucide-react';

export const nodeCategories = [
  { id: 'trigger', label: 'Triggers' },
  { id: 'app', label: 'Apps' },
  { id: 'logic', label: 'Logic' },
  { id: 'data', label: 'Data' },
  { id: 'ai', label: 'AI' },
];

// Icon components wrapped as functions to prevent JSX syntax errors
const iconComponents = {
  clock: () => <Clock size={18} />,
  webhook: () => <WebhookIcon size={18} />,
  slack: () => <MessageSquare size={18} />,
  discord: () => <MessageSquare size={18} />,
  github: () => <GitBranch size={18} />,
  if: () => <SplitSquareVertical size={18} />,
  switch: () => <Columns size={18} />,
  http: () => <AppWindow size={18} />,
  json: () => <FileJson size={18} />,
  database: () => <Database size={18} />,
  llm: () => <Bot size={18} />,
  agent: () => <Workflow size={18} />,
  mail: () => <Mail size={18} />,
  transform: () => <Code size={18} />,
  embedding: () => <BrainCircuit size={18} />,
  vectorSearch: () => <Search size={18} />,
  imageGen: () => <Image size={18} />,
  speechToText: () => <AudioLines size={18} />,
  merge: () => <ArrowRightLeft size={18} />,
  wait: () => <Pause size={18} />,
  loop: () => <Repeat size={18} />
};

export const nodeDefinitions = [
  // Triggers
  {
    type: 'cron',
    label: 'Cron',
    category: 'trigger',
    icon: iconComponents.clock,
    description: 'Triggers on a schedule',
  },
  {
    type: 'webhook',
    label: 'Webhook',
    category: 'trigger',
    icon: iconComponents.webhook,
    description: 'Triggers when HTTP request is received',
  },
  {
    type: 'mail',
    label: 'Email Trigger',
    category: 'trigger',
    icon: iconComponents.mail,
    description: 'Trigger on new emails',
  },
  
  // Apps
  {
    type: 'slack',
    label: 'Slack',
    category: 'app',
    icon: iconComponents.slack,
    description: 'Interact with Slack channels and messages',
  },
  {
    type: 'discord',
    label: 'Discord',
    category: 'app',
    icon: iconComponents.discord,
    description: 'Send and receive Discord messages',
  },
  {
    type: 'github',
    label: 'GitHub',
    category: 'app',
    icon: iconComponents.github,
    description: 'Manage GitHub issues, PRs, and repositories',
  },
  {
    type: 'webhook-app',
    label: 'Webhook',
    category: 'app',
    icon: iconComponents.webhook,
    description: 'Send HTTP requests to external services',
  },
  {
    type: 'notion',
    label: 'Notion',
    category: 'app',
    icon: iconComponents.json,
    description: 'Create or update Notion pages',
  },
  {
    type: 'googleSheets',
    label: 'Google Sheets',
    category: 'app',
    icon: iconComponents.database,
    description: 'Read or write to spreadsheets',
  },
  
  // Logic
  {
    type: 'if',
    label: 'IF',
    category: 'logic',
    icon: iconComponents.if,
    description: 'Conditional branching based on conditions',
  },
  {
    type: 'switch',
    label: 'Switch',
    category: 'logic',
    icon: iconComponents.switch,
    description: 'Route to different paths based on value',
  },
  {
    type: 'merge',
    label: 'Merge',
    category: 'logic',
    icon: iconComponents.merge,
    description: 'Combine multiple inputs',
  },
  {
    type: 'wait',
    label: 'Wait',
    category: 'logic',
    icon: iconComponents.wait,
    description: 'Pause execution for a duration',
  },
  {
    type: 'loop',
    label: 'Loop',
    category: 'logic',
    icon: iconComponents.loop,
    description: 'Iterate over items',
  },
  
  // Data
  {
    type: 'http',
    label: 'HTTP Request',
    category: 'data',
    icon: iconComponents.http,
    description: 'Make external API calls',
  },
  {
    type: 'json',
    label: 'JSON',
    category: 'data',
    icon: iconComponents.json,
    description: 'Parse and manipulate JSON data',
  },
  {
    type: 'database',
    label: 'Database',
    category: 'data',
    icon: iconComponents.database,
    description: 'Connect to databases like MySQL or MongoDB',
  },
  {
    type: 'transform',
    label: 'Data Transform',
    category: 'data',
    icon: iconComponents.transform,
    description: 'Format and structure data',
  },
  
  // AI
  {
    type: 'llm',
    label: 'LLM Call',
    category: 'ai',
    icon: iconComponents.llm,
    description: 'Call language models like GPT-4 or Claude',
  },
  {
    type: 'agent',
    label: 'Agent Runner',
    category: 'ai',
    icon: iconComponents.agent,
    description: 'Run an autonomous AI agent with tools',
  },
  {
    type: 'embedding',
    label: 'Embedding Generate',
    category: 'ai',
    icon: iconComponents.embedding,
    description: 'Create vector embeddings',
  },
  {
    type: 'vectorSearch',
    label: 'Vector Search',
    category: 'ai',
    icon: iconComponents.vectorSearch,
    description: 'Semantic search in vectors',
  },
  {
    type: 'imageGen',
    label: 'Image Generation',
    category: 'ai',
    icon: iconComponents.imageGen,
    description: 'Generate images with AI',
  },
  {
    type: 'speechToText',
    label: 'Speech-to-Text',
    category: 'ai',
    icon: iconComponents.speechToText,
    description: 'Transcribe audio to text',
  },
];

// Create a structured object organized by category for easy access
export const categorizedNodes = {
  triggers: nodeDefinitions.filter(node => node.category === 'trigger'),
  apps: nodeDefinitions.filter(node => node.category === 'app'),
  logic: nodeDefinitions.filter(node => node.category === 'logic'),
  data: nodeDefinitions.filter(node => node.category === 'data'),
  ai: nodeDefinitions.filter(node => node.category === 'ai')
};