import { useState } from 'react';
import { nodeCatalog, type NodeCatalogEntry } from '../nodes/nodeRegistry';

type AddNodeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (entry: NodeCatalogEntry) => void;
};

export default function AddNodeModal({ isOpen, onClose, onAdd }: AddNodeModalProps) {
  const [activeTab, setActiveTab] = useState<'trigger' | 'action' | 'condition'>('trigger');

  if (!isOpen) return null;

  const filtered = nodeCatalog.filter((e) => e.category === activeTab);

  const handleAdd = (entry: NodeCatalogEntry) => {
    onAdd(entry);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onMouseDown={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-96 max-h-[80vh] flex flex-col"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <span className="font-semibold text-gray-800">Add Node</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {(['trigger', 'action', 'condition'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-primary border-b-2 border-gray-500'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {tab === 'trigger' ? 'Triggers' : tab === 'action' ? 'Actions' : 'Conditions'}
            </button>
          ))}
        </div>

        {/* Node list */}
        <div className="overflow-y-auto flex-1 p-3 flex flex-col gap-2">
          {filtered.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">No {activeTab}s available.</p>
          )}
          {filtered.map((entry) => (
            <div
              key={entry.type}
              onClick={() => handleAdd(entry)}
              className="border border-gray-200 rounded-lg p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-700">{entry.label}</span>
              <button
                onClick={(e) => { e.stopPropagation(); handleAdd(entry); }}
                className="bg-secondary border border-gray-300 rounded px-3 py-1 text-xs font-medium hover:brightness-95 shrink-0"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
