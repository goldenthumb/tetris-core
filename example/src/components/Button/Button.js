import { h } from 'hyperapp';
import css from './Button.scss';

const Button = ({ theme, action, disabled, content, ...props }) => (
  <button
    type="button"
    class={css[(theme ? `${theme}` : 'button')]}
    onclick={disabled ? () => null : action}
    data-content={content}
    style={disabled ? dim : {}}
    {...props}
  />
);

export default Button;