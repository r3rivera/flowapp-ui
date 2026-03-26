import type { Node, NodeProps } from '@xyflow/react';

export type TriggerAccountCreationData = Node<{
    eventType: string,
    description: string,
}>;

export default function AccountCreationNode({ data }: NodeProps<TriggerAccountCreationData>) {
    return (
        <div style={{ padding: 10, border: '1px solid black', borderRadius: 5, backgroundColor: '#f0f0f0' }}>
            <strong>Trigger: {data.eventType}</strong>
            <p>{data.description}</p>      
        </div>
    );
};
