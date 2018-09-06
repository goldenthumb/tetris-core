import Block from '../Block';

const BLOCK = {
  color: '#00a9eb',
  types: {
    0: [[1, 1, 1, 1]],
    1: [[1], [1], [1], [1]],
    2: [[1, 1, 1, 1]],
    3: [[1], [1], [1], [1]]
  }
};

test('초기값', () => {
  const {color, types} = BLOCK;
  const block = new Block(color, types);

  expect(block.info.color).toBe(color);
  expect(block.info.type).toBe(types[0]);
});

test('시계방향 회전', () => {
  const {color, types} = BLOCK;
  const block = new Block(color, types);

  block.rotate();
  expect(block.info.type).toBe(types[1]);

  block.rotate();
  expect(block.info.type).toBe(types[2]);

  block.rotate();
  expect(block.info.type).toBe(types[3]);

  block.rotate();
  expect(block.info.type).toBe(types[0]);
});

test('반시계방향 회전', () => {
  const {color, types} = BLOCK;
  const block = new Block(color, types);

  block.rotate(false);
  expect(block.info.type).toBe(types[3]);

  block.rotate(false);
  expect(block.info.type).toBe(types[2]);

  block.rotate(false);
  expect(block.info.type).toBe(types[1]);

  block.rotate(false);
  expect(block.info.type).toBe(types[0]);
});