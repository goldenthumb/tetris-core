import Data from '../Data';
import { deepCopy } from '../../lib/utils';

export default class DisplayManager {
  constructor({ rows, cols }) {
    this.size = { rows, cols };
    this.current = new Data(this.size).initialize();
    this.total = new Data(this.size).initialize();
    this.data = new Data(this.size).initialize();
  }

  setDisplay({ block, position }) {
    const display = deepCopy(this.current);

    for (let row = 0; row < display.length; row++) {
      for (let col = 0; col < display[col].length; col++) {
        if (row === position.y && col === position.x) {
          this._appendBlock({
            block: deepCopy(block.colorize()),
            display,
            startRow: row,
            startCol: col
          });
        }
      }
    }
  }

  _appendBlock({ block, display, startRow, startCol }) {
    for (let row = 0; row < block.length; row++) {
      for (let col = 0; col < block[row].length; col++) {
        display[startRow + row][startCol + col] = block[row][col];
      }
    }

    this.data = display;

    return this;
  };
}