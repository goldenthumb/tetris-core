import OPTIONS from './OPTIONS';

import Stage from '../core/Stage';
import BlockManager from '../core/BlockManager';
import Score from '../core/Score';

export default (app) => {
  const stage = new Stage(OPTIONS.STAGE);
  const blockManager = new BlockManager(OPTIONS.BLOCK);
  const score = new Score();
  let interval = null;
  let times = 1;

  return (state, actions, view, element) => {
    state = {
      tetris: {
        ...stage.getState(),
        ...score.getState(),
        ...blockManager.getState(),
        ...state
      }
    };

    actions = {
      tetris: {
        getState: () => state => state,
        start: () => stage.next(),
        block: (action) => blockManager[action](),
        blockRender: () => blockManager.getState(),
        scoreRender: () => score.getState(),
        stageRender: () => stage.getState(),
        ...actions
      }
    };

    const main = app(state, actions, view, element);

    stage.on('render', main.tetris.stageRender);
    blockManager.on('render', main.tetris.blockRender);

    score.on('update', main.tetris.scoreRender);
    stage.on('update', speed => {
      clearInterval(interval);

      interval = setInterval(() => {
        main.tetris.block('moveDown');
      }, speed);
    });

    blockManager.on('clear', line => {
      const state = main.tetris.getState();
      const total = score.add(line, state.stage);

      if (total > times * 40) {
        times++;
        stage.next();
      }
    });

    blockManager.on('end', () => {
      clearInterval(interval);
      alert('end');
      location.reload();
    });

    return main;
  }
};