import EventEmitter from 'event-emitter';

export default class Score {
  constructor() {
    this._current = 0;
    this._total = 0;
    this._emitter = new EventEmitter();
  }

  on(eventName, listener) {
    this._emitter.on(eventName, listener);
  }

  add (line, stage = 1) {
    const score = parseInt((stage * 5) * (2 ** line));
    this._current += score;
    this._total += score;

    this._emitter.emit('render', this._total);
  }

  clear () {
    this._current = 0;
    this._total = 0;
  }

  getRenderData() {
    return { score: this._total };
  }
}