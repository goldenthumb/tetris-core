import EventEmitter from 'event-emitter';
import _ from 'lodash';

class Stage {
  constructor({ maxStage, speed }) {
    this._options = { maxStage, speed };
    this._speed = speed.min;
    this._stage = 0;
    this._emitter = new EventEmitter();
  }

  on(eventName, listener) {
    this._emitter.on(eventName, listener);
  }

  next() {
    if (this._stage++ < this._options.maxStage) {
      this._setSpeed();
    }
  }

  _setSpeed() {
    const { min, max } = this._options.speed;
    this._speed = min - ((min - max) * (this._stage / this._options.maxStage));
    this._emitter.emit('update', { stage: this._stage, speed: this._speed });
  }

  getState() {
    return {
      stage: this._stage
    }
  }
}

class Block {
  constructor(blocks) {
    this._width = null;
    this._height = null;
    this._block = blocks[_.random(0, blocks.length - 1)];
    this._typeSize = Object.entries(this._block.types).length;
    this._type = _.random(0, this._typeSize - 1);

    this._setBlockSize();
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  rotate(isClockwise = true) {
    isClockwise
      ? this._clockwise()
      : this._anticlockwise();

    this._setBlockSize();

    return this;
  }

  colorize() {
    return _.cloneDeep(this._block.types[this._type]).map(line => (
      line.map((cell, i) => {
        if (line[i] === 1) return this._block.color;
        else return 0;
      })
    ))
  }

  _clockwise() {
    if (++this._type > this._typeSize - 1) {
      this._type = 0;
    }
  }

  _anticlockwise() {
    if (--this._type < 0) {
      this._type = this._typeSize - 1;
    }
  }

  _setBlockSize() {
    this._height = this._block.types[this._type].length;
    this._width = this._block.types[this._type][0].length;
  }
}

class Data extends Array {
  constructor({ rows, cols }) {
    super();

    this.rows = rows;
    this.cols = cols;
  }

  initialize() {
    for (let i = 0; i < this.rows; i++) {
      this[i] = new Array(this.cols).fill(0);
    }

    return this;
  }

  set(data) {
    if (data.length !== this.rows) {
      throw new Error('rows is not valid');
    }

    data.forEach((row, i) => {
      if (row.length !== this.cols) {
        throw new Error('cols is not valid');
      }

      this[i] = row;
    });

    return this;
  }
}

const isEmpty = value => value === 0 || value === undefined || value === null;

const circulateTwoDArray = (array, fn) => {
  array.forEach((row, y) => {
    row.forEach((col, x) => {
      fn(y, x, array);
    });
  });
};

const isConflictTwoDArray = (a, b) => {
  let result = false;

  circulateTwoDArray(a, (y, x) => {
    if (!isEmpty(a[y][x]) && !isEmpty(b[y][x])) result = true;
  });

  return result;
};

const cloneTwoDArray = data => {
  const newData = new Data({ rows: data.length, cols: data[0].length }).initialize();

  circulateTwoDArray(data, (y, x) => {
    newData[y][x] = data[y][x];
  });

  return newData;
};

class BlockManager {
  constructor({ rows, cols, startPoint }, blocks) {
    this._startPoint = startPoint;
    this._displaySize = { rows, cols };
    this._blocks = blocks;
    this._emitter = new EventEmitter();
    this._block = null;
    this._nextBlock = null;
    this._position = null;
    this._nextPosition = null;
    this._current = new Data(this._displaySize).initialize();
    this._total = new Data(this._displaySize).initialize();
    this._display = new Data(this._displaySize).initialize();

    this.change();
  }

  on(eventName, listener) {
    this._emitter.on(eventName, listener);
  }

  change() {
    this._block = this._nextBlock || new Block(this._blocks);
    this._position = this._startPoint;
    this._nextPosition = this._startPoint;
    this._nextBlock = new Block(this._blocks);

    return this;
  }

  rotate() {
    this._block.rotate();
    this._nextPosition = this._position;

    if (!this._isAvailable()) {
      this._block.rotate(false);
      return;
    }

    this._setDisplay();
  }

  moveDown() {
    const { x, y } = this._position;
    this._nextPosition = { x: x, y: y + 1 };

    if (!this._isAvailable()) return;

    this._setDisplay();
  }

  moveLeft() {
    const { x, y } = this._position;
    this._nextPosition = { x: x - 1, y: y };

    if (!this._isAvailable()) return;

    this._setDisplay();
  }

  moveRight() {
    const { x, y } = this._position;
    this._nextPosition = { x: x + 1, y: y };

    if (!this._isAvailable()) return;

    this._setDisplay();
  }

  getState() {
    return {
      display: this._display,
      nextBlock: this._nextBlock.colorize()
    }
  }

  _isAvailable() {
    if (this._isEdge()) return false;

    if (this._isOnTheBottom() || this._isConflict()) {
      if (this._position.y < 0) {
        this._emitter.emit('end');
        return false;
      }

      circulateTwoDArray(this._block.colorize(), (y, x, block) => {
        const blockY = this._position.y + y;
        const blockX = this._position.x + x;

        if (!isEmpty(block[y][x])) {
          this._total[blockY][blockX] = block[y][x];
        }
      });

      this._clearLine();
      this.change().moveDown();
    }

    return true;
  }

  _clearLine() {
    let clearLine = 0;

    this._total.forEach((row, i) => {
      if (_.every(row)) {
        clearLine++;
        const line = _.fill(row, 0);
        this._total.splice(i, 1);
        this._total.unshift(line);
      }
    });

    if (clearLine) {
      this._emitter.emit('clear', clearLine);
    }
  }

  _setDisplay() {
    this._position = this._nextPosition;

    circulateTwoDArray(this._block.colorize(), (y, x, block) => {
      if (!isEmpty(block[y][x])) {
        this._current[this._position.y + y][this._position.x + x] = block[y][x];
      }
    });

    this._display = this._merge(cloneTwoDArray(this._total), this._current);
    this._current = new Data(this._displaySize).initialize();
    this._emitter.emit('render', this.getState());
  }

  _isEdge() {
    return (
      this._nextPosition.x < 0 ||
      (this._block.height + this._nextPosition.y) > this._total.rows + 1 ||
      (this._block.width + this._nextPosition.x) > this._total.cols
    );
  }

  _isOnTheBottom() {
    return (this._nextPosition.y + this._block.height) > this._total.rows;
  }

  _isConflict() {
    const current = new Data(this._displaySize).initialize();

    circulateTwoDArray(this._block.colorize(), (y, x, block) => {
      if (!isEmpty(block[y][x])) {
        current[this._nextPosition.y + y][this._nextPosition.x + x] = block[y][x];
      }
    });

    return isConflictTwoDArray(this._total, current);
  }

  _merge(total, append) {
    circulateTwoDArray(total, (y, x) => {
      if (!isEmpty(append[y][x])) total[y][x] = append[y][x];
    });

    return total;
  }
}

class Score {
  constructor() {
    this._total = 0;
    this._emitter = new EventEmitter();
  }

  on(eventName, listener) {
    this._emitter.on(eventName, listener);
  }

  add(line, stage = 1) {
    const score = parseInt((stage * 5) * (2 ** line));
    this._total += score;
    this._emitter.emit('update', this._total);

    return this._total;
  }

  getState() {
    return { score: this._total };
  }
}

class TetrisCore {
  constructor(OPTIONS$$1 = OPTIONS$$1) {
    this._stage = new Stage(OPTIONS$$1.stage);
    this._block = new BlockManager(OPTIONS$$1.display, OPTIONS$$1.blocks);
    this._score = new Score();
    this._emitter = new EventEmitter();
    this._scoreRate = OPTIONS$$1.stage.scoreRate;
    this._interval = null;

    this._state = {
      stage: 1,
      score: 0,
      speed: OPTIONS$$1.stage.speed.min,
      nextBlock: null,
      display: null
    };

    this._attachEvents();
  }

  on(eventName, listener) {
    this._emitter.on(eventName, listener);
  }

  start() {
    this._stage.next();
  }

  rotate() {
    this._block.rotate();
  }

  moveDown() {
    this._block.moveDown();
  }

  moveLeft() {
    this._block.moveLeft();
  }

  moveRight() {
    this._block.moveRight();
  }

  getState() {
    return this._state;
  }

  _attachEvents() {
    this._block.on('render', data => this._setState(data));

    this._score.on('update', score => this._setState({ score }));

    this._stage.on('update', ({ stage, speed }) => {
      this._setState({ stage, speed });
      clearInterval(this._interval);
      this._interval = setInterval(() => this._block.moveDown(), speed);
    });

    this._block.on('clear', line => {
      const stage = this._state.stage;
      const total = this._score.add(line, stage);
      if (total > stage * this._scoreRate) this._stage.next();
    });

    this._block.on('end', () => {
      clearInterval(this._interval);
      this._emitter.emit('end');
    });
  }

  _setState(state) {
    this._state = {
      ...this._state,
      ...state
    };

    this._emitter.emit('render', this._state);
  }
}

export default TetrisCore;
