import {NodeId, ProcedureDefinition, ProcedureId} from '@magicflow/core';

import {Procedure} from '../../../library';

let startId = 'start' as NodeId;
let nodeId = 'node1' as NodeId;

let definition: ProcedureDefinition = {
  id: 'procedure1' as ProcedureId,
  metadata: {},
  leaves: [],
  nodes: [
    {
      id: startId,
      nexts: [
        {
          type: 'node',
          id: nodeId,
        },
      ],
    },
    {
      id: nodeId,
    },
  ],
};

test('create normal subnode', async () => {
  let procedure = new Procedure(definition);

  await procedure.createNode(nodeId);

  expect(procedure.definition.nodes.length).toBe(3);
});

test('create node at fakeNode', () => {
  let procedure = new Procedure(definition);

  void expect(() => procedure.createNode('fakeNode' as NodeId)).rejects.toThrow(
    "Not found node metadata by id 'fakeNode'",
  );
});

test('create subnode and move nexts', async () => {
  let procedure = new Procedure(definition);

  await procedure.createNode(startId, 'next');

  let startNode = procedure.definition.nodes.find(node => node.id === startId);

  let newNodeId = startNode?.nexts?.[0].id;

  expect(newNodeId).not.toBe(nodeId);

  let newNode = procedure.definition.nodes.find(node => node.id === newNodeId);

  expect(newNode?.nexts?.[0].id).toBe(nodeId);
});

test('create node between two nodes', async () => {
  let procedure = new Procedure(definition);

  await procedure.createNode(startId, {type: 'node', id: nodeId});

  let startNode = procedure.definition.nodes.find(node => node.id === startId);

  let newNodeId = startNode?.nexts?.[0].id;

  expect(newNodeId).not.toBe(nodeId);

  let newNode = procedure.definition.nodes.find(node => node.id === newNodeId);

  expect(newNode?.nexts?.[0].id).toBe(nodeId);
});

test('create node between node and fakeNext', () => {
  let procedure = new Procedure(definition);

  void expect(() =>
    procedure.createNode(startId, {type: 'node', id: 'fakeNode' as NodeId}),
  ).rejects.toThrow(
    `Not found node next by {\"type\":\"node\",\"id\":\"fakeNode\"}`,
  );
});