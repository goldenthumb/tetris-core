import BLOCKS from './BLOCKS';
import Block from '../Block';
import Data from '../Data';

export default class BlockManager {
  constructor(OPTIONS) {
    this._blocks = BLOCKS.map(({ color, types }) => new Block(color, types));
    this._index = Math.floor((Math.random() * this._blocks.length - 1) + 1);
    this._startPoint = OPTIONS.START_POINT;
    this._displaySize = OPTIONS.DISPLAY;
    this._current = null;
    this._data = null;
    this._position = null;
    this._block = null;
    this._nextBlock = null;

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
    this._block = this._nextBlock || this._blocks[this._index];
    this._position = this._startPoint;
    this._index = Math.floor((Math.random() * this._blocks.length - 1) + 1);
    this._nextBlock = this._blocks[this._index];

    return this;
  }

  rotate() {
    this._block.rotate();

    if (this._isEdge()) return false;

    return this._getRenderData();
  }

  moveDown() {
    const { x, y } = this._position;
    const position = { x: x, y: y + 1 };

    return this._move(position);
  }

  moveLeft() {
    const { x, y } = this._position;
    const position = { x: x - 1, y: y };

    return this._move(position);
  }

  moveRight() {
    const { x, y } = this._position;
    const position = { x: x + 1, y: y };

    return this._move(position);
  }

  _move(position) {
    if (this._isEdge(position)) return false;

    return this._getRenderData(position);
  }

  _getRenderData(position) {
    return {
      displayData: this._setDisplay(position),
      nextBlock: this._nextBlock.colorize()
    };
  }

  _setDisplay(nextPosition = this._position) {
    const { rows, cols } = this._data;

    const nextCurrent = this._appendBlock({
      display: new Data({ rows, cols }).initialize(),
      block: this._block.colorize(),
      ...nextPosition
    });

    if (this._isOverlap(this._data, nextCurrent)) {
      this._data = this._merge(this._data, this._current);

      if (nextPosition.y === 0) {
        alert('end');
        location.reload();
      }

      this.change();
      return this._data;
    }

    if (this._isOnTheBottom(nextPosition)) {
      this._data = this._merge(this._data, nextCurrent);
      this.change();
      return this._data;
    }

    this._position = nextPosition;
    this._current = nextCurrent;

    return this._merge(this._cloneData(this._data), this._current);
  }

  _appendBlock({ display, block, y, x }) {
    block.forEach((value, row) => {
      value.forEach((value, col) => {
        display[y + row][x + col] = value;
      });
    });

    return display;
  };
  
  _isEdge(position = this._position) {
    return (
      position.x < 0 ||
      (this._block.rows + position.y) > this._data.rows ||
      (this._block.cols + position.x) > this._data.cols
    );
  }

  _isOverlap(a, b) {
    for (let row = 0; row < this._displaySize.rows; row++) {
      for (let col = 0; col < this._displaySize.cols; col++) {
        if (a[row][col] !== 0 && b[row][col] !== 0) {
          return true;
        }
      }
    }

    return false;
  }

  _isOnTheBottom(nextPosition) {
    return(nextPosition.y + this._block.rows) === this._data.rows;
  }

  _cloneData(data) {
    const newData = new Data(this._displaySize).initialize();

    data.forEach((value, row) => {
      value.forEach((value, col) => {
        newData[row][col] = value;
      });
    });

    return newData;
  }

  _merge(total, current) {
    total.forEach((value, row) => {
      value.forEach((value, col) => {
        if (current[row][col] !== 0) {
          total[row][col] = current[row][col];
        }
      });
    });

    return total;
  }
}