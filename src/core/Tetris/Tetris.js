import Data from '../Data';
import BlockManager from '../BlockManager';

import { deepCopy } from '../../lib/utils';

export default class Tetris {
  constructor(OPTIONS) {
    this.size = OPTIONS.DISPLAY;
    this.current = new Data(this.size).initialize();
    this.data = new Data(this.size).initialize();
    this.blockManager = new BlockManager(OPTIONS.START_POINT);
  }

  change() {
    this.blockManager.change(this.data);
    this._updateCurrentBlock();
    return this.data = this.current;
  }

  rotate() {
    this.blockManager.rotate(this.data);
    this._updateCurrentBlock();
    return this.data = this.current;
  }

  moveDown() {
    this.blockManager.moveDown(this.data);
    this._updateCurrentBlock();
    return this.data = this.current;
  }

  moveLeft() {
    this.blockManager.moveLeft(this.data);
    this._updateCurrentBlock();
    return this.data = this.current;
  }

  moveRight() {
    this.blockManager.moveRight(this.data);
    this._updateCurrentBlock();
    return this.data = this.current;
  }
  
  _updateCurrentBlock() {
    const { block, position } = this.blockManager;

    this.current = this._appendBlock({
      display: new Data(this.size).initialize(),
      block: deepCopy(block.colorize()),
      ...position
    });
  }

  _appendBlock({ display, block, y, x }) {
    block.forEach((value, row) => {
      value.forEach((value, col) => {
        display[y + row][x + col] = value;
      });
    });

    return display;
  };
}