import BlockManager from '../core/BlockManager';
import DisplayManager from '../core/DisplayManager';

const DISPLAY = { rows: 20, cols: 11 };
const START_POINT = { x: 4, y: 0 };

export const state = {
  tetris: {
    blockManager: new BlockManager(START_POINT),
    displayManager: new DisplayManager(DISPLAY)
  }
};

export const actions = {
  tetris: {
    block: (action) => ({ blockManager, displayManager }) => {
      const nextBlockManager = blockManager[action](displayManager.data);

      if (nextBlockManager) {
        const { block, position } = blockManager;
        displayManager.setDisplay({ block, position });

        return { blockManager: nextBlockManager };
      }
    }
  }
};