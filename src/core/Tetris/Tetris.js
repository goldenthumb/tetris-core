import Data from '../Data';
import BlockManager from '../BlockManager';

export default class Tetris {
  constructor(OPTIONS) {
    this.size = OPTIONS.DISPLAY;
    this._current = new Data(this.size).initialize();
    this._data = new Data(this.size).initialize();
    this._block = new BlockManager(OPTIONS.START_POINT);
  }

  change() {
    this._block.change(this._data);
    return this._updateBlockData();
  }

  rotate() {
    this._block.rotate(this._data);
    return this._updateBlockData();
  }

  moveDown() {
    this._block.moveDown(this._data);
    return this._updateBlockData();
  }

  moveLeft() {
    this._block.moveLeft(this._data);
    return this._updateBlockData();
  }

  moveRight() {
    this._block.moveRight(this._data);
    return this._updateBlockData();
  }

  _updateBlockData() {
    const { block, position } = this._block;

    const nextCurrent = this._appendBlock({
      display: new Data(this.size).initialize(),
      block: block.colorize(),
      ...position
    });

    const isOnTheBottom = (position.y + block.rows) === this.size.rows;

    if (this._isOverlap(this._data, nextCurrent)) {
      if (position.y === 0) {
        alert('end');
        this._initializeData();
        return this.change();
      }

      this._data = this._merge(this._data, this._current);
      return this.change();
    }

    if (isOnTheBottom) {
      this._data = this._merge(this._data, this._current = nextCurrent);
      return this.change();
    }

    return this._merge(this._cloneData(this._data), this._current = nextCurrent);
  }

  _appendBlock({ display, block, y, x }) {
    block.forEach((value, row) => {
      value.forEach((value, col) => {
        display[y + row][x + col] = value;
      });
    });

    return display;
  };

  _cloneData(data) {
    const newData = new Data(this.size).initialize();

    data.forEach((value, row) => {
      value.forEach((value, col) => {
        newData[row][col] = value;
      });
    });

    return newData;
  }

  _isOverlap(a, b) {
    for (let row = 0; row < this.size.rows; row++) {
      for (let col = 0; col < this.size.cols; col++) {
        if (a[row][col] !== 0 && b[row][col] !== 0) {
          return true;
        }
      }
    }

    return false;
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

  _initializeData() {
    this._current = new Data(this.size).initialize();
    this._data = new Data(this.size).initialize();
  }
}