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
      startRow: position.y,
      startCol: position.x
    });

    this.data = this.current;
  }

  _appendBlock({ block, startRow, startCol }) {
    const display = this._createData();

    for (let row = 0; row < block.length; row++) {
      for (let col = 0; col < block[row].length; col++) {
        if (block[row][col] !== 0) {
          display[startRow + row][startCol + col] = block[row][col];
        }
      }
    }

    return display;
  };

  _createData() {
    return new Data(this.size).initialize();
  }
}