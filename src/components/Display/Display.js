import { h } from 'hyperapp';

import Renderer from '../Renderer';

const Display = () => ({ tetris: { displayData } }) => (
  <Renderer data={displayData} />
);

export default Display;