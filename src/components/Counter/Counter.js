import { h } from 'hyperapp';
import css from './Counter.scss';

const Counter = () => (state, actions) => (
  <div class={css['red-line']}>
    <h1>{state.counter.count}</h1>
    <button onclick={() => actions.counter.down(1)}>-</button>
    <button onclick={() => actions.counter.up(1)}>+</button>
  </div>
);

export default Counter;
