import { useState, useCallback } from 'react';
import { Handle, Position, type Node, type NodeProps, useReactFlow } from '@xyflow/react';

type Operator = '=' | '>' | '<';
type ClientAttribute = 'HNW' | 'PAS';

type ClientAttributeConditionNodeData = Node<{
    attribute: ClientAttribute;
    operator: Operator;
    value: string;
}>;

export const defaultData = {
    attribute: 'HNW' as ClientAttribute,
    operator: '=' as Operator,
    value: '',
};

export default function ClientAttributeConditionNode({ id, data }: NodeProps<ClientAttributeConditionNodeData>) {
    const [attribute, setAttribute] = useState<ClientAttribute>(data.attribute ?? 'HNW');
    const [operator, setOperator] = useState<Operator>(data.operator ?? '=');
    const [value, setValue] = useState(data.value ?? '');
    const { updateNodeData } = useReactFlow();

    const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

    const handleAttributeChange = useCallback((val: ClientAttribute) => {
        setAttribute(val);
        updateNodeData(id, { attribute: val, operator, value });
    }, [id, updateNodeData, operator, value]);

    const handleOperatorChange = useCallback((val: Operator) => {
        setOperator(val);
        updateNodeData(id, { attribute, operator: val, value });
    }, [id, updateNodeData, attribute, value]);

    const handleValueChange = useCallback((val: string) => {
        setValue(val);
        updateNodeData(id, { attribute, operator, value: val });
    }, [id, updateNodeData, attribute, operator]);

    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-md w-80"
            onMouseDown={stopPropagation}>

            {/* Content */}
            <div className="bg-info px-3 py-2 rounded-t-lg border-b border-gray-300">
                <strong className="text-sm font-semibold">Condition: Client Attribute</strong>
            </div>
            <div className="p-3">
                {/* Client Attribute */}
                <div className="flex flex-col gap-0.5">
                    <label className="text-xs font-medium text-gray-500">Client Attribute</label>
                    <select
                        value={attribute}
                        onChange={(e) => handleAttributeChange(e.target.value as ClientAttribute)}
                        className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full bg-white"
                    >
                        <option value="HNW">HNW</option>
                        <option value="PAS">PAS</option>
                    </select>

                    <select
                        value={operator}
                        onChange={(e) => handleOperatorChange(e.target.value as Operator)}
                        className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full bg-white"
                    >
                        <option value="=">=</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                    </select>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleValueChange(e.target.value)}
                        placeholder="Enter value"
                        className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full"
                    />
                </div>
            </div>
            

            {/* Handles at diamond points */}
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} id="true" />
            <Handle type="source" position={Position.Bottom} id="false" />
        </div>
    );
}
