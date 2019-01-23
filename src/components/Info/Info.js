import { h } from 'hyperapp';
import css from './Info.scss';

const Info = ({ label, data }) => (
  <div class={css['info-wrap']}>
    <span>{label} : </span>
    {data}
  </div>
);

export default Info;