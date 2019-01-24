import { h } from 'hyperapp';
import css from './LineRenderer.scss';

import CellRenderer from '../CellRenderer/index';

const LineRenderer = ({ line }) => (
  <div class={css['line']}>
    {line.map(color => (
      <CellRenderer color={color} />
    ))}
  </div>
);

export default LineRenderer;