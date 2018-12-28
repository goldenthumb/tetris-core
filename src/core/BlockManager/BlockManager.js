import BLOCKS from './BLOCKS';
import Block from '../Block';

export default class BlockManager {
  constructor(position) {
    this.blocks = BLOCKS.map(({ color, types }) => new Block(color, types));
    this.position = position;
    this.index = 0;
    this.block = this.blocks[this.index];
  }

  change({ rows, cols }) {
    const nextIndex = this.index > this.blocks.length - 2 ? 0 : this.index + 1;
    const nextBlock = this.blocks[this.index];

    if (this._isAvailable({ block: nextBlock, rows, cols })) {
      this.index = nextIndex;
      this.block = nextBlock;

      return this;
    }

    return false;
  }

  rotate({ rows, cols }) {
    this.block.rotate();

    if (this._isAvailable({ rows, cols })) {
      return this;
    }

    this.block.rotate(false);

    return false;
  }

  moveDown({ rows, cols }) {
    const { x, y } = this.position;
    const position = { x: x, y: y + 1 };

    return this._move({ position, rows, cols });
  }

  moveLeft({ rows, cols }) {
    const { x, y } = this.position;
    const position = { x: x - 1, y: y };

    return this._move({ position, rows, cols });
  }

  moveRight({ rows, cols }) {
    const { x, y } = this.position;
    const position = { x: x + 1, y: y };

    return this._move({ position, rows, cols });
  }

  _isAvailable({ block = this.block, position = this.position, rows, cols }) {
    return (
      position.y >= 0 &&
      position.x >= 0 &&
      (block.rows + position.y) <= rows &&
      (block.cols + position.x) <= cols
    );
  }

  _move({ position, rows, cols }) {
    if (this._isAvailable({ position, rows, cols })) {
      this.position = position;
      return this;
    }

    return false;
  }
}