import { useState, useCallback } from 'react';
import { Handle, Position, type Node, type NodeProps, useReactFlow } from '@xyflow/react';
import { clientAttributes, operators, type ClientAttribute, type Operator } from './ruleEngineOptions';

type Rule = {
    id: string;
    attribute: ClientAttribute;
    operator: Operator;
    value: string;
};

type RuleEngineConditionNodeData = Node<{
    rules: Rule[];
}>;

const createRule = (): Rule => ({
    id: crypto.randomUUID(),
    attribute: clientAttributes[0],
    operator: operators[0],
    value: '',
});

export const defaultData = {
    rules: [createRule()],
};

export default function RuleEngineConditionNode({ id, data }: NodeProps<RuleEngineConditionNodeData>) {
    const [rules, setRules] = useState<Rule[]>(data.rules?.length ? data.rules : [createRule()]);
    const { updateNodeData } = useReactFlow();

    const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

    const commit = useCallback((next: Rule[]) => {
        setRules(next);
        updateNodeData(id, { rules: next });
    }, [id, updateNodeData]);

    const handleRuleChange = useCallback((ruleId: string, patch: Partial<Rule>) => {
        commit(rules.map((rule) => (rule.id === ruleId ? { ...rule, ...patch } : rule)));
    }, [rules, commit]);

    const handleAddRule = useCallback(() => {
        commit([...rules, createRule()]);
    }, [rules, commit]);

    const handleRemoveRule = useCallback((ruleId: string) => {
        commit(rules.filter((rule) => rule.id !== ruleId));
    }, [rules, commit]);

    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-md w-80"
            onMouseDown={stopPropagation}>

            {/* Content */}
            <div className="bg-info px-3 py-2 rounded-t-lg border-b border-gray-300">
                <strong className="text-sm font-semibold">Client Ruleset</strong>
            </div>
            <div className="p-3 flex flex-col gap-2">
                {rules.map((rule) => (
                    <div key={rule.id} className="flex items-start gap-1">
                        <div className="flex gap-0.5 flex-1">
                            <select
                                value={rule.attribute}
                                onChange={(e) => handleRuleChange(rule.id, { attribute: e.target.value as ClientAttribute })}
                                className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full bg-white"
                            >
                                {clientAttributes.map((attribute) => (
                                    <option key={attribute} value={attribute}>{attribute}</option>
                                ))}
                            </select>

                            <select
                                value={rule.operator}
                                onChange={(e) => handleRuleChange(rule.id, { operator: e.target.value as Operator })}
                                className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full bg-white"
                            >
                                {operators.map((operator) => (
                                    <option key={operator} value={operator}>{operator}</option>
                                ))}
                            </select>

                            <input
                                type="text"
                                value={rule.value}
                                onChange={(e) => handleRuleChange(rule.id, { value: e.target.value })}
                                placeholder="Enter value"
                                className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => handleRemoveRule(rule.id)}
                            disabled={rules.length === 1}
                            title="Remove rule"
                            className="nodrag border border-gray-300 rounded px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            ✕
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddRule}
                    className="nodrag border border-dashed border-gray-300 rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
                >
                    + Add rule
                </button>
                <div className="text-xs text-gray-500 mt-1">
                    <p>When all rules are met, apply the template.</p>
                </div>
                <div className="mt-2">
                    <input type="text" placeholder="Apply AEM Template" className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400" />
                </div>
            </div>

            {/* Handles */}
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} id="true" />
            <Handle type="source" position={Position.Bottom} id="false" />
        </div>
    );
}
