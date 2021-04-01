import {NodeId} from '@magicflow/core';

import {ProcedureModifier, ProcedureUtil} from '../../library';

test('copy params', () => {
  expect(ProcedureUtil.copyNode(ProcedureUtil.createNode())).toBeTruthy();
  expect(
    ProcedureUtil.copyNode({
      ...ProcedureUtil.createNode(),
      leaves: [ProcedureUtil.createLeaf()],
    }),
  ).toBeTruthy();
});

test('createBranchesNode params', () => {
  expect(ProcedureUtil.createBranchesNode()).toBeTruthy();
  expect(ProcedureUtil.createBranchesNode({nexts: []})).toBeTruthy();
});

test('requireNode error', () => {
  let node1 = 'node1' as NodeId;

  expect(() =>
    ProcedureUtil.requireNode(ProcedureUtil.createEmptyProcedure(), node1),
  ).toThrow(`Not found node definition by id 'node1'`);

  expect(() =>
    ProcedureUtil.requireNode(
      ProcedureModifier.addNode(
        ProcedureUtil.createEmptyProcedure(),
        ProcedureUtil.createBranchesNode({id: node1}),
      ),
      node1,
      'node',
    ),
  ).toThrow(`Not found node definition by id 'node1'`);
});