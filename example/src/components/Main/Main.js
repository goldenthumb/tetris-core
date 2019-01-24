import { h } from 'hyperapp';
import css from './Main.scss';

import Panel from '../Panel';
import Preview from '../Preview';
import Info from '../Info';
import Display from '../Display';

const Main = () => ({ tetris: { stage, score } }, { tetris: tetrisActions }) => {
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
        tetrisActions.start();
        document.addEventListener('keydown', keyDownListener);
      }}
      onremove={() => {
        document.removeEventListener('keydown', keyDownListener);
      }}
    >
      <Panel>
        <Preview />
        <Info label='stage' data={stage} />
        <Info label='score' data={score} />
      </Panel>
      <Display/>
    </div>
  );
};


export default Main;