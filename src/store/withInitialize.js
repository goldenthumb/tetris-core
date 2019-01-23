import OPTIONS from './OPTIONS';
import BlockManager from '../core/BlockManager';
import Score from '../core/Score';

export default (app) => {
  const blockManager = new BlockManager(OPTIONS);
  const score = new Score();

  return (state, actions, view, element) => {
    state = {
      tetris: {
        ...blockManager.getRenderData(),
        ...state
      }
    };

    actions = {
      tetris: {
        update: () => blockManager.getRenderData(),
        block: (action) => blockManager[action](),
        ...actions
      }
    };

    const main = app(state, actions, view, element);

    blockManager.on('render', main.tetris.update);

    blockManager.on('end', () => {
      alert('end');
      location.reload();
    });

    return main;
  }
};