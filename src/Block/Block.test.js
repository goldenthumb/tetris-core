import Block from './Block';
import OPTIONS from '../OPTIONS';

const block = new Block(OPTIONS.blocks);

test('rotate clockwise', () => {
  for (let i = 0; i < 10; i++) {
    const type = block._type;
    block.rotate();
    expect(block._type).toBe(type + 1 === block._typeSize ? 0 : type + 1);
  }
});

test('rotate anticlockwise', () => {
  for (let i = 0; i < 10; i++) {
    const type = block._type;
    block.rotate(false);
    expect(block._type).toBe(type - 1 < 0 ? block._typeSize - 1 : type - 1);
  }
});