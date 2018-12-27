import { h } from 'hyperapp';
import css from './CellRenderer.scss';

const CellRenderer = ({ color }) => {
  return (
    <span
      class={css['cell']}
      style={color && { background: color }}
    />
  );
};

export default CellRenderer;
