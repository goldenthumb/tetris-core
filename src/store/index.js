import Data from '../core/Data';
import BlockManager from '../core/BlockManager';

export const state = {
  tetris: {
    blockManager: new BlockManager({ x: 4, y: 0 }),
    currentBlocksData: new Data({ rows: 20, cols: 11 }).initialize(),
    totalBlocksData: new Data({ rows: 20, cols: 11 }).initialize()
  }
};

export const actions = {
  tetris: {
    blockManager: (action) => ({ blockManager, currentBlocksData }) => {
      const { rows, cols } = currentBlocksData;
      const nextBlockManager = blockManager[action]({ rows, cols });
      if (nextBlockManager) return { blockManager: nextBlockManager };
    },
    setDisplayData: (currentBlockData) => ({ currentBlockData })
  }
};