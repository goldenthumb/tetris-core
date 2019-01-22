import EventEmitter from 'event-emitter';

import Block from '../Block';
import Data from '../Data';

import { isEmpty, circulateTwoDArray, isConflictTwoDArray, cloneTwoDArray } from '../../lib/utils';

export default class BlockManager {
  constructor(OPTIONS) {
    this._startPoint = OPTIONS.START_POINT;
    this._displaySize = OPTIONS.DISPLAY;
    this._emitter = new EventEmitter();
    this._block = null;
    this._nextBlock = null;
    this._position = null;
    this._nextPosition = null;
    this._current = null;
    this._data = null;

    this.initialize();
  }

  on(eventName, listener) {
    this._emitter.on(eventName, listener);
  }

  initialize() {
    this._current = new Data(this._displaySize).initialize();
    this._data = new Data(this._displaySize).initialize();
    this.change();
  }

  change() {
    this._block = this._nextBlock || new Block();
    this._position = this._startPoint;
    this._nextPosition = this._startPoint;
    this._nextBlock = new Block();

    return this;
  }

  rotate() {
    this._block.rotate();
    this._nextPosition = this._position;

    if (this._isAvailable()) {
      return this;
    }

    this._block.rotate(false);
    return false;
  }

  moveDown() {
    const { x, y } = this._position;
    this._nextPosition = { x: x, y: y + 1 };

    return this._isAvailable() ? this : false;
  }

  moveLeft() {
    const { x, y } = this._position;
    this._nextPosition = { x: x - 1, y: y };

    return this._isAvailable() ? this : false;
  }

  moveRight() {
    const { x, y } = this._position;
    this._nextPosition = { x: x + 1, y: y };

    return this._isAvailable() ? this : false;
  }

  getRenderData() {
    return {
      displayData: this._setDisplay(),
      nextBlock: this._nextBlock.colorize()
    };
  }

  _setDisplay() {
    if (this._isOnTheBottom(this._nextPosition)) {
      this.change();
      return this._data = this._merge(this._data, this._current);
    }

    const nextCurrent = this._appendBlock(this._nextPosition);

    if (isConflictTwoDArray(this._data, nextCurrent)) {
      if (this._nextPosition.y === 0) {
        this._emitter.emit('end');
        return;
      }

      this.change();
      return this._data = this._merge(this._data, this._current);
    }

    this._position = this._nextPosition;
    this._current = nextCurrent;

    return this._merge(cloneTwoDArray(this._data), this._current);
  }

  _appendBlock(position) {
    const display = new Data(this._displaySize).initialize();
    const block = this._block.colorize();

    circulateTwoDArray(block, (y, x) => {
      display[position.y + y][position.x + x] = block[y][x];
    });

    return display;
  };

  _isAvailable() {
    return (
      this._nextPosition.x >= 0 &&
      (this._block.rows + this._nextPosition.y) <= this._data.rows + 1 &&
      (this._block.cols + this._nextPosition.x) <= this._data.cols
    );
  }

  _isOnTheBottom(nextPosition) {
    return (nextPosition.y + this._block.rows) > this._data.rows;
  }

  _merge(total, append) {
    circulateTwoDArray(total, (y, x) => {
      if (!isEmpty(append[y][x])) total[y][x] = append[y][x];
    });

    return total;
  }
}