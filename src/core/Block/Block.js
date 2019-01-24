import _ from 'lodash';

import BLOCKS from './BLOCKS';

export default class Block {
  constructor() {
    this._width = null;
    this._height = null;
    this._block = BLOCKS[_.random(0, BLOCKS.length - 1)];
    this._typeSize = Object.keys(this._block.types).length;
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
    return _.cloneDeep(this._block.types[this._type]).map((line) => (
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