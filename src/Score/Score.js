import EventEmitter from 'event-emitter';

export default class Score {
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