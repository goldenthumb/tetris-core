import { h } from 'hyperapp';
import { app } from 'hyperapp';
import './index.scss';

import withInitialize from './store/withInitialize';
import Main from './components/Main';

withInitialize(app)({}, {}, <Main />, document.getElementById('root'));
