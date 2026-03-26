import { useState, useCallback } from 'react';
import { Handle, Position, type Node, type NodeProps, useReactFlow } from '@xyflow/react';

type ProcessingMode = 'API' | 'Stream' | 'Batch';

export type TriggerCustomEventData = Node<{
    eventName: string;
    processingMode: ProcessingMode;
}>;

export const defaultData = { eventName: '', processingMode: 'API' as ProcessingMode };

export default function AppTriggerEventNode({ id, data }: NodeProps<TriggerCustomEventData>) {
    const [eventName, setEventName] = useState(data.eventName ?? '');
    const [processingMode, setProcessingMode] = useState<ProcessingMode>(data.processingMode ?? 'API');
    const { updateNodeData } = useReactFlow();

    const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

    const handleEventNameChange = useCallback((value: string) => {
        setEventName(value);
        updateNodeData(id, { eventName: value, processingMode });
    }, [id, updateNodeData, processingMode]);

    const handleModeChange = useCallback((value: ProcessingMode) => {
        setProcessingMode(value);
        updateNodeData(id, { eventName, processingMode: value });
    }, [id, updateNodeData, eventName]);

    return (
        <div
            className="bg-white border border-gray-300 rounded-lg shadow-md w-72"
            onMouseDown={stopPropagation}
        >
            {/* Header */}
            <div className="bg-primary px-3 py-2 rounded-t-lg border-b border-gray-300">
                <strong className="text-sm font-semibold">Trigger: Custom Event</strong>
            </div>

            <div className="p-3 flex flex-col gap-3">
                {/* Event Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">Event Name</label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => handleEventNameChange(e.target.value)}
                        placeholder="Enter event name"
                        className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full"
                    />
                </div>

                {/* Processing Mode */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">Processing Mode</label>
                    <select
                        value={processingMode}
                        onChange={(e) => handleModeChange(e.target.value as ProcessingMode)}
                        className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full"
                    >
                        <option value="API">API</option>
                        <option value="Stream">Stream</option>
                        <option value="Batch">Batch</option>
                    </select>
                </div>
            </div>

            {/* Only a source handle — this node is always the flow start */}
            <Handle type="source" position={Position.Right} />
        </div>
    );
}
