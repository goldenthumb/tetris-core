# tetris-core [![npm](https://img.shields.io/npm/v/tetris-core.svg)](https://www.npmjs.com/package/tetris-core)
A tetris module only with core data layer.

### Installing
```bash
$ npm install tetris-core
```

### Demo (using hyperapp)
- [example](https://goldenthumb.github.io/tetris-core/)
- [hyperapp](https://www.npmjs.com/package/hyperapp)
```bash
$ git clone https://github.com/goldenthumb/tetris-core.git
$ cd tetris-core
$ npm install
$ npm run dev

Now open this URL in your browser: http://localhost:3000/
```

## Usage
```js
import Tetris from 'tetris-core';

const tetris = new Tetris();

tetris.on('render', data => {
  const { stage, score, speed, nextBlock, display } = data;
  // stage ==> number
  // score ==> number
  // speed ==> number
  // nextBlock ==> two dimensional array (0 or block hex color code)
  // display ==> two dimensional array (0 or block hex color code)
});

tetris.on('end', () => {
  // game over
});

tetris.start();

```

## Options
```
// default options
const options = {
  display: {
    rows: 20, 
    cols: 11,
    startPoint: { x: 4, y: -1 },
  },
  stage: {
    maxStage: 10,
    speed: { min: 500, max: 100 },
    scoreRate: 40
  },
  blocks: [
    {
      color: '#00a9eb',
      types: {
        0: [
          [1, 1, 1, 1]
        ],
        1: [
          [1],
          [1],
          [1],
          [1]
        ],
        2: [
          [1, 1, 1, 1]
        ],
        3: [
          [1],
          [1],
          [1],
          [1]
        ]
      }
    },
    {
      color: '#fedf38',
      types: {
        0: [
          [0, 1, 0],
          [1, 1, 1]
        ],
        1: [
          [1, 0],
          [1, 1],
          [1, 0]
        ],
        2: [
          [1, 1, 1],
          [0, 1, 0]
        ],
        3: [
          [0, 1],
          [1, 1],
          [0, 1]
        ]
      }
    },
    {
      color: '#88bf39',
      types: {
        0: [
          [1, 0, 0],
          [1, 1, 1]
        ],
        1: [
          [1, 1],
          [1, 0],
          [1, 0]
        ],
        2: [
          [1, 1, 1],
          [0, 0, 1]
        ],
        3: [
          [0, 1],
          [0, 1],
          [1, 1]
        ]
      }
    },
    {
      color: '#fd2239',
      types: {
        0: [
          [0, 0, 1],
          [1, 1, 1]
        ],
        1: [
          [1, 0],
          [1, 0],
          [1, 1]
        ],
        2: [
          [1, 1, 1],
          [1, 0, 0]
        ],
        3: [
          [1, 1],
          [0, 1],
          [0, 1]
        ]
      }
    },
    {
      color: '#4bc6b0',
      types: {
        0: [
          [0, 1, 1],
          [1, 1, 0]
        ],
        1: [
          [1, 0],
          [1, 1],
          [0, 1]
        ],
        2: [
          [0, 1, 1],
          [1, 1, 0]
        ],
        3: [
          [1, 0],
          [1, 1],
          [0, 1]
        ]
      }
    },
    {
      color: '#c655e7',
      types: {
        0: [
          [1, 1, 0],
          [0, 1, 1]
        ],
        1: [
          [0, 1],
          [1, 1],
          [1, 0]
        ],
        2: [
          [1, 1, 0],
          [0, 1, 1]
        ],
        3: [
          [0, 1],
          [1, 1],
          [1, 0]
        ]
      }
    },
    {
      color: '#ec7e48',
      types: {
        0: [
          [1, 1],
          [1, 1]
        ]
      }
    }
  ]
};

const tetris = new Tetris(options);
```

## Events
|  Name  | Description                       |
|--------|-----------------------------------|
| render | triggers when game need repaint   |
| end    | triggers when game over           |
<br />

## Methods
|  Name     | Description                                           |
|-----------|-------------------------------------------------------|
| start     | start the game                                         |
| getState  | render data (stage, score, speed, nextBlock, display) |          |
| moveDown  | move the block down                                   |
| moveLeft  | move the block left                                   |
| moveRight | move the block right                                  |
| rotate    | rotate the block                                      |
<br />

## License
MIT
