import EventEmitter from 'event-emitter';

export default class Stage {
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