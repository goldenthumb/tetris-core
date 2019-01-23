import { h } from 'hyperapp';
import css from './Score.scss';

const Score = () => ({ tetris: { score } }) => (
  <div class={css['score-wrap']}>
    <span>score : </span>
    {score}
  </div>
);

export default Score;