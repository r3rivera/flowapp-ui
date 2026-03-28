import { useCallback } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

const PREFERRED_CHANNELS = 'PREFERRED_CHANNEL'; // This would be defined in your client data model
type ClientAttributeConditionNodeData = Node<{
    value: string;
}>;

export const defaultData = {
    value: PREFERRED_CHANNELS,
};

export default function ClientPreferredChannelNode({}: NodeProps<ClientAttributeConditionNodeData>) {
    const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-md w-80"
            onMouseDown={stopPropagation}>

            {/* Content */}
            <div className="bg-info px-3 py-2 rounded-t-lg border-b border-gray-300">
                <strong className="text-sm font-semibold">Condition: Client Preferred Channel</strong>
            </div>
            <div className="p-3">
                <div className="flex flex-col gap-0.5">
                    <p>Use client's preferred communication channel</p>
                </div>
            </div>
            
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} id="true" />
            <Handle type="source" position={Position.Bottom} id="false" />
        </div>
    );
}
