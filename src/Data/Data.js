export default class Data extends Array {
  constructor({ rows, cols }) {
    super();

    this.rows = rows;
    this.cols = cols;
  }

  initialize() {
    for (let i = 0; i < this.rows; i++) {
      this[i] = new Array(this.cols).fill(0);
    }

    return this;
  }

  set(data) {
    if (data.length !== this.rows) {
      throw new Error('rows is not valid');
    }

    data.forEach((row, i) => {
      if (row.length !== this.cols) {
        throw new Error('cols is not valid');
      }

      this[i] = row;
    });

    return this;
  }
}