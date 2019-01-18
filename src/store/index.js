import Tetris from '../core/Tetris';

const OPTIONS = {
  START_POINT: { x: 4, y: 0 },
  DISPLAY: { rows: 20, cols: 11 }
};

const tetris = new Tetris(OPTIONS);

export const state = {
  tetris: {
    nextBlock: null,
    displayData: null
  }
};

export const actions = {
  tetris: {
    block: (action) => () => {
      return tetris[action]().getRenderData();
    }
  }
};