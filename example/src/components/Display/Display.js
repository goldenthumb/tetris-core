import { h } from 'hyperapp';

import Renderer from '../Renderer';

const Display = () => ({ tetris: { display } }) => (
  <Renderer data={display} />
);

export default Display;