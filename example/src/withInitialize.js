import OPTIONS from './OPTIONS';

import Tetris from '../../src';

export default (app) => {
  const tetrisApp = new Tetris(OPTIONS);

  return (state, actions, view, element) => {
    state = {
      tetris: {
        ...tetrisApp.getState(),
        ...state
      }
    };

    actions = {
      tetris: {
        start: () => tetrisApp.start(),
        block: (action) => tetrisApp[action](),
        render: () => tetrisApp.getState(),
        ...actions
      }
    };

    const main = app(state, actions, view, element);

    tetrisApp.on('render', main.tetris.render);

    tetrisApp.on('end', () => {
      alert('end');
      location.reload();
    });

    return main;
  }
};