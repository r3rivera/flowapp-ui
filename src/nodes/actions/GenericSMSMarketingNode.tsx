import { useState, useCallback } from 'react';
import { Handle, Position, type Node, type NodeProps, useReactFlow } from '@xyflow/react';

type GenericSMSMarketingNodeData = Node<{
    message: string;
}>;

export const defaultData = { message: '' };

export default function GenericSMSMarketingNode({ id, data }: NodeProps<GenericSMSMarketingNodeData>) {
    const [message, setMessage] = useState(data.message ?? '');
    const { updateNodeData } = useReactFlow();
    const handleMessageChange = useCallback((value: string) => {
        setMessage(value);
        updateNodeData(id, { message: value });
    }, [id, updateNodeData]);

    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-md w-72">
            <Handle type="target" position={Position.Left} />
            <div className="bg-secondary px-3 py-2 rounded-t-lg border-b border-gray-300">
                <strong className="text-sm font-semibold">Action: Generic SMS Marketing</strong>
            </div>

            <div className="p-3">
                <label className="text-xs font-medium text-gray-600">Message</label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    placeholder="Enter SMS message"
                    className="nodrag mt-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full"
                />
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    );
}
