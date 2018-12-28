export default class Stage {
  constructor({ max, speed, count }) {
    this._options = { max, speed, count };
    this._speed = speed.min;
    this._count = 0;
    this._stage = 0;
  }

  clear() {
    this._stage = 0;
    this.next();
  }

  next() {
    if (this._stage++ < this._options.max) {
      this._setSpeed();
      this._setCount();
    }
  }

  _init() {
    this._setSpeed();
    this._setCount();
  }

  _setSpeed() {
    const {min, max} = this._options.speed;
    this._speed = min - ((min - max) * (this._stage / this._options.max));
  }

  _setCount() {
    const {point, times} = this._options.count;
    this._count = point + (times * this._stage)
  }

  get stage() {
    return this._stage;
  }

  get speed() {
    return this._speed;
  }

  get count() {
    return this._count;
  }
}