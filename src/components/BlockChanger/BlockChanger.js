import { h } from 'hyperapp';
import css from './BlockChanger.scss';

import Button from '../Button/index';
import Renderer from '../Renderer/index';

const BlockChanger = () => ({ tetris: { blockManager } }, { tetris: tetrisActions }) => (
  <div>
    <div class={css['block-change-wrap']}>
      <Button
        action={() => tetrisActions.block('change')}
        oncreate={() => tetrisActions.block('change')}
        content='block change'
      />
    </div>
    <div class={css['arrows']}>
      <div>
        <Button theme='none' content='&#8593;'/>
        <Button theme='arrow' action={() => tetrisActions.block('rotate')} content='&#8593;' />
        <Button theme='none' content='&#8593;'/>
      </div>
      <div>
        <Button
          theme='arrow'
          action={() => tetrisActions.block('moveLeft')}
          content='&#8592;'
        />
        <Button
          theme='arrow'
          action={() => tetrisActions.block('moveDown')}
          content='&#8595;'
        />
        <Button
          theme='arrow'
          action={() => tetrisActions.block('moveRight')}
          content='&#8594;'
        />
      </div>
    </div>
    <div class={css['block-wrap']}>
      <Renderer data={blockManager.block.colorize()} />
    </div>
  </div>
);

export default BlockChanger;