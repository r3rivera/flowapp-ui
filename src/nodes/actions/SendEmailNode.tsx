import { useState, useCallback } from 'react';
import { Handle, Position, type Node, type NodeProps, useReactFlow } from '@xyflow/react';

type FieldType = 'String' | 'Number' | 'Boolean' | 'Date' | 'Email' | 'URL';

type EmailField = {
    id: number;
    name: string;
    type: FieldType;
};


type SendEmailNodeData = Node<{
    templateName: string;
    fields: EmailField[];
}>;

export const defaultData = { templateName: '', fields: [] as EmailField[] };

let fieldIdCounter = 0;

export default function SendEmailNode({ id, data }: NodeProps<SendEmailNodeData>) {
    const [templateName, setTemplateName] = useState(data.templateName ?? '');
    const [fieldInput, setFieldInput] = useState('');
    const [fields, setFields] = useState<EmailField[]>(data.fields ?? []);
    const { updateNodeData } = useReactFlow();

    const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

    const handleTemplateNameChange = useCallback((value: string) => {
        setTemplateName(value);
        updateNodeData(id, { templateName: value, fields });
    }, [id, updateNodeData, fields]);

    const addField = useCallback(() => {
        const name = fieldInput.trim();
        if (!name) return;
        const newFields = [...fields, { id: ++fieldIdCounter, name, type: 'String' as FieldType }];
        setFields(newFields);
        setFieldInput('');
        updateNodeData(id, { templateName, fields: newFields });
    }, [fieldInput, fields, id, updateNodeData, templateName]);

    const deleteField = useCallback((fieldId: number) => {
        const newFields = fields.filter((f) => f.id !== fieldId);
        setFields(newFields);
        updateNodeData(id, { templateName, fields: newFields });
    }, [fields, id, updateNodeData, templateName]);

    const updateFieldType = useCallback((fieldId: number, type: FieldType) => {
        const newFields = fields.map((f) => (f.id === fieldId ? { ...f, type } : f));
        setFields(newFields);
        updateNodeData(id, { templateName, fields: newFields });
    }, [fields, id, updateNodeData, templateName]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') addField();
        },
        [addField],
    );

    return (
        <div
            className="bg-white border border-gray-300 rounded-lg shadow-md w-80"
            onMouseDown={stopPropagation}
        >
            <Handle type="target" position={Position.Left} />

            {/* Header */}
            <div className="bg-primary px-3 py-2 rounded-t-lg border-b border-gray-300">
                <strong className="text-sm font-semibold">Action: Send Email</strong>
            </div>

            <div className="p-3 flex flex-col gap-3">
                {/* Template Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">Template Name</label>
                    <input
                        type="text"
                        value={templateName}
                        onChange={(e) => handleTemplateNameChange(e.target.value)}
                        placeholder="Enter template name"
                        className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 w-full"
                    />
                </div>

                {/* Email Data Fields + Add Field */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">Email Data Fields</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={fieldInput}
                            onChange={(e) => setFieldInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Field name"
                            className="nodrag border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 flex-1"
                        />
                        <button
                            onClick={addField}
                            className="nodrag bg-secondary border border-gray-300 rounded px-2 py-1 text-sm font-medium hover:brightness-95 whitespace-nowrap"
                        >
                            Add Field
                        </button>
                    </div>
                </div>

                {/* Fields Table */}
                {fields.length > 0 && (
                    <div className="overflow-auto max-h-48">
                        <table className="w-full text-xs border border-gray-200 rounded">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left px-2 py-1 font-semibold text-gray-600 w-2/5">Name</th>
                                    <th className="text-left px-2 py-1 font-semibold text-gray-600 w-2/5">Type</th>
                                    <th className="text-center px-2 py-1 font-semibold text-gray-600 w-1/5">Control</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fields.map((field, index) => (
                                    <tr
                                        key={field.id}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                    >
                                        <td className="px-2 py-1 truncate max-w-0" title={field.name}>
                                            {field.name}
                                        </td>
                                        <td className="px-2 py-1">
                                            <select
                                                value={field.type}
                                                onChange={(e) => updateFieldType(field.id, e.target.value as FieldType)}
                                                className="nodrag border border-gray-200 rounded px-1 py-0.5 text-xs w-full focus:outline-none focus:border-blue-400"
                                            >
                                                <option>String</option>
                                                <option>Number</option>
                                                <option>Boolean</option>
                                                <option>Date</option>
                                                <option>Email</option>
                                                <option>URL</option>
                                            </select>
                                        </td>
                                        <td className="px-2 py-1 text-center">
                                            <button
                                                onClick={() => deleteField(field.id)}
                                                className="nodrag bg-danger border border-gray-200 rounded px-1.5 py-0.5 text-xs font-medium hover:brightness-95"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Handle type="source" position={Position.Right} />
        </div>
    );
}
