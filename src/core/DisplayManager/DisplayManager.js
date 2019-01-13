import Data from '../Data';
import { deepCopy } from '../../lib/utils';

export default class DisplayManager {
  constructor({ rows, cols }) {
    this.size = { rows, cols };
    this.current = new Data(this.size).initialize();
    this.data = new Data(this.size).initialize();
  }

  setDisplay({ block, position }) {
    this.current = this._appendBlock({
      block: deepCopy(block.colorize()),
      ...position
    });

    this.data = this.current;
  }

  _appendBlock({ block, y, x }) {
    const display = this._createData();

    block.forEach((value, row) => {
      value.forEach((value, col) => {
        display[y + row][x + col] = value;
      })
    });

    return display;
  };

  _createData() {
    return new Data(this.size).initialize();
  }
}