import { useState } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

type GenericSMSMarketingNodeData = Node<{
    message: string;
}>;

export default function GenericSMSMarketingNode({ data }: NodeProps<GenericSMSMarketingNodeData>) {
    const [message, setMessage] = useState(data.message ?? '');

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
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter SMS message"
                    className="nodrag mt-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full"
                />
            </div>

            <Handle type="source" position={Position.Right} />
        </div>
    );
}
