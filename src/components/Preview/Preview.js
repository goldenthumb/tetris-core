import { h } from 'hyperapp';
import css from './Preview.scss';

import Renderer from '../Renderer';

const Preview = () => ({ tetris: { nextBlock } }) => {
  if (!nextBlock) return null;

  return (
    <div>
      <div class={css['block-wrap']}>
        <Renderer data={nextBlock} />
      </div>
    </div>
  );
};

export default Preview;