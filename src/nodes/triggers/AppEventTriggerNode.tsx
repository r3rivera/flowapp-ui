import { useState, useCallback } from 'react';
import { Handle, Position, type Node, type NodeProps, useReactFlow } from '@xyflow/react';

type appCode = 'BBA' | 'TOA' | 'LMI';

export type TriggerCustomEventData = Node<{
    eventName: string;
    appCode: appCode;
    defaultTemplate?: string;
}>;

export const defaultData = { eventName: '', appCode: 'BBA' as appCode };

export default function AppTriggerEventNode({ id, data }: NodeProps<TriggerCustomEventData>) {
    const [eventName, setEventName] = useState(data.eventName ?? '');
const [appCode, setAppCode] = useState<appCode>(data.appCode ?? 'BBA');
    const { updateNodeData } = useReactFlow();

    const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

    const handleEventNameChange = useCallback((value: string) => {
        setEventName(value);
        updateNodeData(id, { eventName: value, appCode });
    }, [id, updateNodeData, appCode]);

    const handleModeChange = useCallback((value: appCode) => {
        setAppCode(value);
        updateNodeData(id, { eventName, appCode: value });
    }, [id, updateNodeData, eventName]);

    const [defaultTemplate, setDefaultTemplate] = useState(data.defaultTemplate ?? '');

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

                {/* Application Code */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">Application Code</label>
                    <select
                        value={appCode}
                        onChange={(e) => handleModeChange(e.target.value as appCode)}
                        className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full"
                    >
                        <option value="BBA">BBA</option>
                        <option value="TOA">TOA</option>
                        <option value="LMI">LMI</option>
                    </select>
                </div>

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

                {/* Event Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">Default Template</label>
                    <input
                        type="text"
                        value={defaultTemplate}
                        onChange={(e) => setDefaultTemplate(e.target.value)}
                        placeholder="Enter default template"
                        className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full"
                    />
                </div>

            </div>

            {/* Only a source handle — this node is always the flow start */}
            <Handle type="source" position={Position.Right} />
        </div>
    );
}
