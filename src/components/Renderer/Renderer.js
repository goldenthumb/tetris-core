import { h } from 'hyperapp';
import css from './Renderer.scss';

import LineRenderer from '../LineRenderer/index';

const Renderer = ({ data }) => {
  if (!data) return null;

  return (
    <div class={css['renderer']}>
      {data.map(line => <LineRenderer line={line}/>)}
    </div>
  );
};

export default Renderer;