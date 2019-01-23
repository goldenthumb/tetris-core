import BlockManager from '../core/BlockManager';

const OPTIONS = {
  START_POINT: { x: 4, y: -1 },
  DISPLAY: { rows: 20, cols: 11 }
};

const blockManager = new BlockManager(OPTIONS);

export const state = {
  tetris: {
    nextBlock: null,
    displayData: null
  }
};

export const actions = {
  tetris: {
    block: (action) => () => {
      blockManager[action]();
      return blockManager.getRenderData();
    }
  }
};

blockManager.on('end', () => {
  alert('end');
  location.reload();
});