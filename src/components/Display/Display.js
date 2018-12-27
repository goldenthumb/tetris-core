import { h } from 'hyperapp';

import { deepCopy } from '../../lib/utils';
import Renderer from '../Renderer';

const Display = () => ({ tetris }, { tetris: tetrisActions }) => {
  const { currentBlockData } = tetris;
  setDisplayData(tetris, tetrisActions);

  return (
    <Renderer data={currentBlockData} />
  );
};

export default Display;

const setDisplayData = ({ blockManager, currentBlocksData }, actions) => {
  const display = deepCopy(currentBlocksData);
  const currentBlock = blockManager.block;
  const { position } = blockManager;

  for (let row = 0; row < display.length; row++) {
    for (let col = 0; col < display[col].length; col++) {
      if (row === position.y && col === position.x) {
        appendBlock({ currentBlock, display, startRow: row, startCol: col, actions });
      }
    }
  }
};

const appendBlock = ({ display, startRow, startCol, currentBlock, actions }) => {
  const block = deepCopy(currentBlock.colorize());

  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      display[startRow + row][startCol + col] = block[row][col];
    }
  }

  actions.setDisplayData(display);
};