import OPTIONS from './OPTIONS';
import BlockManager from '../core/BlockManager';
import Score from '../core/Score';

export default (app) => {
  const blockManager = new BlockManager(OPTIONS);
  const score = new Score();

  return (state, actions, view, element) => {
    state = {
      tetris: {
        ...score.getRenderData(),
        ...blockManager.getRenderData(),
        ...state
      }
    };

    actions = {
      tetris: {
        block: (action) => blockManager[action](),
        blockRender: () => blockManager.getRenderData(),
        scoreRender: () => score.getRenderData(),
        ...actions
      }
    };

    const main = app(state, actions, view, element);

    blockManager.on('render', main.tetris.blockRender);
    blockManager.on('score', clearLine => score.add(clearLine));
    score.on('render', main.tetris.scoreRender);

    blockManager.on('end', () => {
      alert('end');
      location.reload();
    });

    return main;
  }
};