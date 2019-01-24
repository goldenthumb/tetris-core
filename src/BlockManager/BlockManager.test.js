import BlockManager from './BlockManager';

test('initialize', () => {
  const START_POSITION = { rows: 0, cols: 4 };
  const blockManager = new BlockManager(START_POSITION);

  expect(blockManager.position).toBe(START_POSITION);
});
