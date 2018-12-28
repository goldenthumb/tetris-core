import DisplayManager from './DisplayManager';

test('initialize', () => {
  const DISPLAY = { rows: 0, cols: 4 };
  const displayManager = new DisplayManager(DISPLAY);

  expect(displayManager.size).toEqual(DISPLAY);
});