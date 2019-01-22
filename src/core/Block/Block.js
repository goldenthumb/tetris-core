import BLOCKS from './BLOCKS';
import { deepCopy, getRandomNumber } from '../../lib/utils';

export default class Block {
  constructor() {
    this.cols = null;
    this.rows = null;
    this._block = BLOCKS[getRandomNumber(BLOCKS.length)];
    this._typeSize = Object.keys(this._block.types).length;
    this._type = getRandomNumber(this._typeSize);

    this._setBlockSize();
  }

  rotate(isClockwise = true) {
    isClockwise
      ? this._clockwise()
      : this._anticlockwise();

    this._setBlockSize();

    return this;
  }

  colorize() {
    return deepCopy(this._block.types[this._type]).map((line) => (
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
    this.rows = this._block.types[this._type].length;
    this.cols = this._block.types[this._type][0].length;
  }
}