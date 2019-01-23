import { h } from 'hyperapp';
import css from './Panel.scss';

const Panel = ({}, children) => (
  <div class={css['panel']}>
    {children}
  </div>
);

export default Panel;