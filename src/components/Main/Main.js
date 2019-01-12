import { h } from 'hyperapp';
import css from './Main.scss';

import Display from '../Display/index';

const Main = () => ({ tetris: { blockManager } }, { tetris: tetrisActions }) => {
  const keyDownListener = ({ keyCode }) => {
    switch (keyCode) {
      case 37:
        tetrisActions.block('moveLeft');
        break;
      case 38:
        tetrisActions.block('rotate');
        break;
      case 39:
        tetrisActions.block('moveRight');
        break;
      case 40:
        tetrisActions.block('moveDown');
        break;
      default:
        break;
    }
  };

  return (
    <div
      class={css['main']}
      oncreate={() => {
        tetrisActions.block('change');
        document.addEventListener('keydown', keyDownListener);
      }}
      onremove={() => {
        document.removeEventListener('keydown', keyDownListener);
      }}
    >
      <Display/>
    </div>
  );
};


export default Main;