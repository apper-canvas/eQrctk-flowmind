import React from 'react';
import DefaultNode from './Nodes/DefaultNode';

// Define all node types that can be used in the Flow canvas
export const nodeTypes = {
  default: DefaultNode,
  trigger: (props) => <DefaultNode {...props} />,
  action: (props) => <DefaultNode {...props} />,
  app: (props) => <DefaultNode {...props} />,
  logic: (props) => <DefaultNode {...props} />,
  ai: (props) => <DefaultNode {...props} />,
};

export default nodeTypes;