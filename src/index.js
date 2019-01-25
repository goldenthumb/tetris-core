import EventEmitter from 'event-emitter';

import Stage from './Stage';
import BlockManager from './BlockManager';
import Score from './Score';
import OPTIONS from './OPTIONS';

export default class TetrisCore {
  constructor(OPTIONS = OPTIONS) {
    this._stage = new Stage(OPTIONS.stage);
    this._block = new BlockManager(OPTIONS.display, OPTIONS.blocks);
    this._score = new Score();
    this._emitter = new EventEmitter();
    this._scoreRate = OPTIONS.stage.scoreRate;
    this._interval = null;

    this._state = {
      stage: 1,
      score: 0,
      speed: OPTIONS.stage.speed.min,
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