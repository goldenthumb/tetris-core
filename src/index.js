import { app } from 'hyperapp';
import './index.scss';

import { state, actions } from './store';
import view from './App';

app(state, actions, view, document.getElementById('root'));
