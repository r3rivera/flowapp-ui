import { useState, useCallback } from 'react'
import { ReactFlow, 
  applyNodeChanges, 
  applyEdgeChanges, 
  addEdge, 
  Background, 
  Controls, 
  Panel,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
 } from '@xyflow/react';
import '@xyflow/react/dist/style.css';


const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2', type: 'step', label: 'trigger' }];

function CustomApp() {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange:OnNodesChange = useCallback(
    (changes: any[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange:OnEdgesChange = useCallback(
    (changes: any[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect:OnConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div>
    <h1>Custom React Flow - Custom Nodes</h1>
    <div style={{ width: '70vw', height: '90vh', border: '1px solid black' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Panel position="top-left">
          <button style={{'border': '1px solid black'}} className='p-3 mr-3' onClick={() => setNodes([])}>Save nodes</button>
          <button style={{'border': '1px solid black'}} className='p-3 mr-3' onClick={() => setEdges([])}>Clear edges</button>
        </Panel>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
    </div>
  )
}



export default CustomApp
