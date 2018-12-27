import { deepCopy } from '../../lib/utils';

export default class Block {
  constructor(color, types) {
    this.cols = null;
    this.rows = null;

    this._color = color;
    this._types = types;
    this._type = 0;
    this._typeSize = Object.keys(this._types).length;

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
    return deepCopy(this._types[this._type]).map((line) => (
      line.map((cell, i) => {
        if (line[i] === 1) return this._color;
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
    this.rows = this._types[this._type].length;
    this.cols = this._types[this._type][0].length;
  }

}