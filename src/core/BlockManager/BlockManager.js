import BLOCKS from './BLOCKS';
import Block from '../Block';

export default class BlockManager {
  constructor(startPoint) {
    this.index = 0;
    this.blocks = BLOCKS.map(({ color, types }) => new Block(color, types));
    this.startPoint = startPoint;
    this.position = this.startPoint;
    this.block = this.blocks[this.index];
  }

  change() {
    this.position = this.startPoint;
    this.index = Math.floor((Math.random() * this.blocks.length - 1) + 1);
    this.block = this.blocks[this.index];
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