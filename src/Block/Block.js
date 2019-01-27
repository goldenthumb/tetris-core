import _ from 'lodash';

export default class Block {
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