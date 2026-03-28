import AppTriggerEventNode, { defaultData as customEventDefaults } from './triggers/AppEventTriggerNode';
import SendEmailNode, { defaultData as sendEmailDefaults } from './actions/SendEmailNode';
import GenericSMSMarketingNode, { defaultData as genericSMSDefaults } from './actions/GenericSMSMarketingNode';
import type { NodeTypes } from '@xyflow/react';
import ClientAttributeConditionNode, { defaultData as clientAttributeConditionDefaults} from './conditions/ClientAttributeConditionNode';
import ClientPreferredChannelNode, { defaultData as clientPreferredChannelDefaults} from './conditions/ClientPreferredChannelNode';

export const nodeTypes: NodeTypes = {
  appTriggerEvent: AppTriggerEventNode,
  sendEmail: SendEmailNode,
  genericSMS: GenericSMSMarketingNode,
  clientAttributeCondition: ClientAttributeConditionNode,
  clientPreferredChannel: ClientPreferredChannelNode,
};

export type NodeCatalogEntry = {
  type: string;
  label: string;
  category: 'trigger' | 'action' | 'condition';
  defaultData: Record<string, unknown>;
};
  
export const nodeCatalog: NodeCatalogEntry[] = [
  {
    type: 'appTriggerEvent',
    label: 'App Trigger Event',
    category: 'trigger',
    defaultData: customEventDefaults,
  },
  {
    type: 'sendEmail',
    label: 'Send Email',
    category: 'action',
    defaultData: sendEmailDefaults,
  },
  {
    type: 'genericSMS',
    label: 'Generic SMS Marketing',
    category: 'action',
    defaultData: genericSMSDefaults,
  },
  {
    type: 'clientAttributeCondition',
    label: 'Client Attribute Condition',
    category: 'condition',
    defaultData: clientAttributeConditionDefaults,
  },
  {
    type: 'clientPreferredChannel',
    label: 'Client Preferred Channel',
    category: 'condition',
    defaultData: clientPreferredChannelDefaults,
  }
];
