import { 
  AppWindow, // Changed from Apps to AppWindow which exists in lucide-react
  Webhook, 
  Activity, 
  Database, 
  GitBranch, 
  Bot, 
  Terminal 
} from 'lucide-react';

export const nodeCategories = [
  { id: 'trigger', label: 'Triggers' },
  { id: 'app', label: 'Apps' },
  { id: 'logic', label: 'Logic' },
  { id: 'data', label: 'Data' },
  { id: 'utils', label: 'Utils' },
  { id: 'ai', label: 'AI' },
];

export const nodeDefinitions = [
  // Triggers
  {
    type: 'webhook_trigger',
    label: 'Webhook Trigger',
    description: 'Starts workflow when webhook is received',
    category: 'trigger',
    icon: Webhook,
    defaultConfig: {
      method: 'POST',
      path: '/webhook',
    },
  },
  {
    type: 'cron_trigger',
    label: 'Cron Trigger',
    description: 'Starts workflow on a time schedule',
    category: 'trigger',
    icon: Activity,
    defaultConfig: {
      expression: '0 * * * *', // Default: hourly
    },
  },
  
  // Apps
  {
    type: 'webhook',
    label: 'Webhook',
    description: 'Receive HTTP requests',
    category: 'app',
    icon: Webhook,
    defaultConfig: {
      method: 'POST',
      path: '/webhook',
    }
  },
  {
    type: 'slack',
    label: 'Slack',
    description: 'Post messages to Slack channels',
    category: 'app',
    icon: AppWindow, // Using AppWindow icon
    defaultConfig: {
      message: 'Hello from the workflow!',
      channel: '#general',
    }
  },
  {
    type: 'discord',
    label: 'Discord',
    description: 'Send messages to Discord channels',
    category: 'app',
    icon: AppWindow, // Using AppWindow icon
    defaultConfig: {
      message: 'Hello from the workflow!',
      channel: 'general',
    }
  },
  {
    type: 'github',
    label: 'GitHub',
    description: 'Create issues, PRs, and more',
    category: 'app',
    icon: AppWindow, // Using AppWindow icon
    defaultConfig: {
      action: 'create_issue',
      title: 'New issue from workflow',
      body: 'This issue was created automatically.',
      repo: 'owner/repo',
    }
  },
  
  // Logic
  {
    type: 'if',
    label: 'IF',
    description: 'Conditional branching',
    category: 'logic',
    icon: GitBranch,
    defaultConfig: {
      condition: '{{data.value > 10}}',
    }
  },
  {
    type: 'switch',
    label: 'SWITCH',
    description: 'Multi-path branching',
    category: 'logic',
    icon: GitBranch,
    defaultConfig: {
      field: '{{data.status}}',
      cases: [
        { value: 'success', label: 'Success' },
        { value: 'error', label: 'Error' },
        { value: 'default', label: 'Default' },
      ]
    }
  },
  
  // Data
  {
    type: 'http_request',
    label: 'HTTP Request',
    description: 'Make API calls to external services',
    category: 'data',
    icon: Database,
    defaultConfig: {
      method: 'GET',
      url: 'https://api.example.com/data',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  },
  {
    type: 'json_transform',
    label: 'JSON Transform',
    description: 'Manipulate JSON data',
    category: 'data',
    icon: Database,
    defaultConfig: {
      operation: 'map',
      expression: '{{item.value * 2}}',
    }
  },
  
  // Utils
  {
    type: 'code',
    label: 'Code',
    description: 'Run custom JavaScript code',
    category: 'utils',
    icon: Terminal,
    defaultConfig: {
      code: 'return { result: items.map(item => item.value * 2) };',
    }
  },
  {
    type: 'delay',
    label: 'Delay',
    description: 'Pause workflow execution',
    category: 'utils',
    icon: Terminal,
    defaultConfig: {
      duration: 1000, // milliseconds
    }
  },
  
  // AI
  {
    type: 'llm_call',
    label: 'LLM Call',
    description: 'Call a language model with a prompt',
    category: 'ai',
    icon: Bot,
    defaultConfig: {
      model: 'gpt-4',
      prompt: 'Summarize the following text: {{data.text}}',
      temperature: 0.7,
    }
  },
  {
    type: 'agent_runner',
    label: 'Agent Runner',
    description: 'Run an AI agent with goals',
    category: 'ai',
    icon: Bot,
    defaultConfig: {
      model: 'gpt-4',
      goal: 'Research the topic and provide a detailed report',
      tools: ['search', 'summarize', 'analyze'],
      maxIterations: 5,
    }
  },
];