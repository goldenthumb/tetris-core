import Data from './Data';

test('initialize', () => {
  const data = new Data({ rows: 4, cols: 5 }).initialize();

  expect(data.rows).toBe(4);
  expect(data.cols).toBe(5);
  // expect(data).toEqual([
  //   [0,0,0,0,0],
  //   [0,0,0,0,0],
  //   [0,0,0,0,0],
  //   [0,0,0,0,0]
  // ]);
});


test('set [normal]', () => {
  const data = new Data({ rows: 4, cols: 5 }).set([
    ['1', '2', '3', '4', '5'],
    ['6', '7', '8', '9', '0'],
    ['1', '0', '1', '0', '1'],
    ['0', '1', '0', '1', '0']
  ]);

  expect(data.rows).toBe(4);
  expect(data.cols).toBe(5);
  expect(data[1][3]).toBe('9');
});

test('set [abnormal]', () => {
  const data = new Data({ rows: 3, cols: 5 });

  expect(() => {
    data.set([
      ['1', '2', '3', '4', '5'],
      ['6', '7', '8', '9', '0'],
      ['1', '0', '1', '0', '1'],
      ['0', '1', '0', '1', '0']
    ]);
  }).toThrowError('rows is not valid')
});