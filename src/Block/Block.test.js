import Block from './Block';

const BLOCK = {
  color: '#00a9eb',
  types: {
    0: [[1, 1, 1, 1]],
    1: [[1], [1], [1], [1]],
    2: [[1, 1, 1, 1]],
    3: [[1], [1], [1], [1]]
  }
};

test('initialize', () => {
  const {color, types} = BLOCK;
  const block = new Block(color, types);

  expect(block._color).toBe(color);
  expect(block._types[block._type]).toBe(types[0]);
});

test('rotate clockwise', () => {
  const {color, types} = BLOCK;
  const block = new Block(color, types);

  block.rotate();
  expect(block._types[block._type]).toBe(types[1]);

  block.rotate();
  expect(block._types[block._type]).toBe(types[2]);

  block.rotate();
  expect(block._types[block._type]).toBe(types[3]);

  block.rotate();
  expect(block._types[block._type]).toBe(types[0]);
});

test('rotate anticlockwise', () => {
  const {color, types} = BLOCK;
  const block = new Block(color, types);

  block.rotate(false);
  expect(block._types[block._type]).toBe(types[3]);

  block.rotate(false);
  expect(block._types[block._type]).toBe(types[2]);

  block.rotate(false);
  expect(block._types[block._type]).toBe(types[1]);

  block.rotate(false);
  expect(block._types[block._type]).toBe(types[0]);
});