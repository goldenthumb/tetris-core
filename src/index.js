// import { app } from 'hyperapp';
// import './index.scss';
//
// import { state, actions } from './store';
// import view from './App';
//
// app(state, actions, view, document.getElementById('root'));


import Block from './core/Block';
import BLOCKS from './core/constants/BLOCKS';

const blocks = BLOCKS.map(({color, types}) => new Block(color, types));

console.log('blocks', blocks);