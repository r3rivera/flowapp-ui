import { useReactFlow } from '@xyflow/react';

type SidebarProps = {
  onAddNode: () => void;
  onClear: () => void;
};

export default function Sidebar({ onAddNode, onClear }: SidebarProps) {
  const { getNodes, getEdges } = useReactFlow();

  const handleSave = () => {
    const flow = { nodes: getNodes(), edges: getEdges() };
    console.log('Saving flow:', JSON.stringify(flow));
    /*
    const blob = new Blob([JSON.stringify(flow, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow.json';
    a.click();
    URL.revokeObjectURL(url);
    */
  };

  return (
    <aside className="flex flex-col gap-3 p-4 bg-white border-r border-gray-200 w-56 shrink-0 overflow-y-auto">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Nodes</span>
      <button
        onClick={onAddNode}
        className="w-full bg-primary border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:brightness-95 text-left"
      >
        + Add Node
      </button>
      <hr className="border-gray-200" />
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Flow Control</span>
      <button
        onClick={handleSave}
        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 text-left"
      >
        Save Flow
      </button>
      <button
        onClick={onClear}
        className="w-full bg-danger border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:brightness-95 text-left"
      >
        Clear Edges
      </button>
    </aside>
  );
}
