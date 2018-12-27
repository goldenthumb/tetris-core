import { h } from 'hyperapp';
import css from './Main.scss';

import Display from '../Display/index';

const Main = () => {
  return (
    <div class={css['main']}>
      <Display />
    </div>
  );
};

export default Main;