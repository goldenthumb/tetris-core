export default class Score {
  constructor() {
    this._current = 0;
    this._total = 0;
  }

  add (line, stage) {
    const score = parseInt((stage * 5) * (2 ** line));
    this._current += score;
    this._total += score;
  }

  clear () {
    this._current = 0;
    this._total = 0;
  }
}