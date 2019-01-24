import Data from '../core/Data';

export const isEmpty = value => value === 0 || value === undefined || value === null;

export const circulateTwoDArray = (array, fn) => {
  array.forEach((row, y) => {
    row.forEach((col, x) => {
      fn(y, x, array);
    });
  });
};

export const isConflictTwoDArray = (a, b) => {
  let result = false;

  circulateTwoDArray(a, (y, x) => {
    if (!isEmpty(a[y][x]) && !isEmpty(b[y][x])) result = true;
  });

  return result;
};

export const cloneTwoDArray = data => {
  const newData = new Data({ rows: data.length, cols: data[0].length }).initialize();

  circulateTwoDArray(data, (y, x) => {
    newData[y][x] = data[y][x];
  });

  return newData;
};