import { h } from 'hyperapp';
import css from './BlockChanger.scss';

import Button from '../Button/index';
import Renderer from '../Renderer/index';

const BlockChanger = () => ({ tetris }, { tetris: tetrisActions }) => {
  const { blockManager: { block } } = tetris;
  const changeBlock = () => tetrisActions.blockManager('change');
  const rotateBlock = () => tetrisActions.blockManager('rotate');

  return (
    <div>
      <div class={css['block-change-wrap']}>
        <Button action={changeBlock} oncreate={changeBlock} content='block change' />
      </div>
      <div class={css['arrows']}>
        <div>
          <Button theme='none' content='&#8593;'/>
          <Button theme='arrow' action={rotateBlock} content='&#8593;' />
          <Button theme='none' content='&#8593;'/>
        </div>
        <div>
          <Button
            theme='arrow'
            action={() => tetrisActions.blockManager('left')}
            content='&#8592;'
          />
          <Button
            theme='arrow'
            action={() => tetrisActions.blockManager('down')}
            content='&#8595;'
          />
          <Button
            theme='arrow'
            action={() => tetrisActions.blockManager('right')}
            content='&#8594;'
          />
        </div>
      </div>
      <div class={css['block-wrap']}>
        <Renderer data={block.colorize()} />
      </div>
    </div>
  );
};

export default BlockChanger;