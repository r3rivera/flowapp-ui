import { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AddNodeModal from './components/AddNodeModal';
import { nodeTypes, type NodeCatalogEntry } from './nodes/nodeRegistry';
import {
  ReactFlow,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  useReactFlow,
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


function FlowCanvas() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nodeIdCounter = useRef(10);

  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes: any[]) => setNodes((prev) => applyNodeChanges(changes, prev)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: any[]) => setEdges((prev) => applyEdgeChanges(changes, prev)),
    [],
  );
  const onConnect: OnConnect = useCallback(
    (params: any) => setEdges((prev) => addEdge(params, prev)),
    [],
  );

  const addNode = useCallback(
    (entry: NodeCatalogEntry) => {
      const canvasEl = document.querySelector('.react-flow') as HTMLElement | null;
      let cx = window.innerWidth / 2;
      let cy = window.innerHeight / 2;
      if (canvasEl) {
        const rect = canvasEl.getBoundingClientRect();
        cx = rect.left + rect.width / 2;
        cy = rect.top + rect.height / 2;
      }
      const position = screenToFlowPosition({ x: cx, y: cy });
      const offset = (nodeIdCounter.current % 5) * 30;
      const id = `node-${++nodeIdCounter.current}`;
      setNodes((prev) => [
        ...prev,
        {
          id,
          type: entry.type,
          position: { x: position.x + offset, y: position.y + offset },
          data: { ...entry.defaultData },
        },
      ]);
    },
    [screenToFlowPosition],
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        onAddNode={() => setIsModalOpen(true)}
        onClear={() => setEdges([])}
      />
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <AddNodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addNode}
      />
    </div>
  );
}

export default function CustomApp() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
    </div>
  );
}
