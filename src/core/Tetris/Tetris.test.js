import Tetris from './Tetris';

test('initialize', () => {
  const DISPLAY = { rows: 0, cols: 4 };
  const tetris = new Tetris(DISPLAY);

  expect(tetris.size).toEqual(DISPLAY);
});