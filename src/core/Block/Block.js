export default class Block {
  constructor(color, types) {
    this._color = color;
    this._types = types;
    this._type = 0;
    this._typeSize = Object.keys(this._types).length;
  }

  get info() {
    return {
      color: this._color,
      type: this._types[this._type]
    };
  }

  rotate(isClockwise = true) {
    isClockwise
      ? this._clockwise()
      : this._anticlockwise();

    return this.block;
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
}