import { h } from 'hyperapp';

import Renderer from '../Renderer';

const Display = () => ({ tetris: { displayManager } }) => (
  <Renderer data={displayManager.data} />
);

export default Display;