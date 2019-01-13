import BLOCKS from './BLOCKS';
import Block from '../Block';

export default class BlockManager {
  constructor(position) {
    this.blocks = BLOCKS.map(({ color, types }) => new Block(color, types));
    this.position = position;
    this.index = 0;
    this.block = this.blocks[this.index];
  }

  change(display) {
    const nextIndex = this.index > this.blocks.length - 2 ? 0 : this.index + 1;
    const nextBlock = this.blocks[this.index];

    if (this._isAvailable({ block: nextBlock, display })) {
      this.index = nextIndex;
      this.block = nextBlock;

      return this;
    }

    return false;
  }

  rotate(display) {
    this.block.rotate();

    if (this._isAvailable({ display })) {
      return this;
    }

    this.block.rotate(false);

    return false;
  }

  moveDown(display) {
    const { x, y } = this.position;
    const position = { x: x, y: y + 1 };

    return this._move({ position, display });
  }

  moveLeft(display) {
    const { x, y } = this.position;
    const position = { x: x - 1, y: y };

    return this._move({ position, display });
  }

  moveRight(display) {
    const { x, y } = this.position;
    const position = { x: x + 1, y: y };

    return this._move({ position, display });
  }

  _isAvailable({ block = this.block, position = this.position, display }) {
    const { rows, cols } = display;

    return (
      position.y >= 0 &&
      position.x >= 0 &&
      (block.rows + position.y) <= rows &&
      (block.cols + position.x) <= cols
    );
  }

  _move({ position, display }) {
    if (this._isAvailable({ position, display })) {
      this.position = position;
      return this;
    }

    return false;
  }
}