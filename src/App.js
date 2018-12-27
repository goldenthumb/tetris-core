import { h } from 'hyperapp';

import BlockChanger from './components/BlockChanger/index';
import Main from './components/Main/index';

const view = () => (
  <div style={{ display: 'flex' }}>
    <BlockChanger />
    <Main />
  </div>
);

export default view;
