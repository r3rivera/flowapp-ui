import AccountCreationNode from './triggers/AccountCreationNode';
import SendEmailNode from './actions/SendEmailNode';
import GenericSMSMarketingNode from './actions/GenericSMSMarketingNode';
import type { NodeTypes } from '@xyflow/react';

export const nodeTypes: NodeTypes = {
  accountCreation: AccountCreationNode,
  sendEmail: SendEmailNode,
  genericSMS: GenericSMSMarketingNode,
};

export type NodeCatalogEntry = {
  type: string;
  label: string;
  category: 'trigger' | 'action';
  defaultData: Record<string, unknown>;
};
  
export const nodeCatalog: NodeCatalogEntry[] = [
  {
    type: 'accountCreation',
    label: 'Account Creation',
    category: 'trigger',
    defaultData: { eventType: 'Account Created', description: '' },
  },
  {
    type: 'sendEmail',
    label: 'Send Email',
    category: 'action',
    defaultData: { templateName: '', fields: [] },
  },
  {
    type: 'genericSMS',
    label: 'Generic SMS Marketing',
    category: 'action',
    defaultData: { message: '' },
  },
];
