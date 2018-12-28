export default class Score {
  constructor() {
    this.curr = 0;
    this.total = 0;
    this.listener = null;
  }

  init(listener) {
    this.listener = listener;
  }

  add(line, stage) {
    const score = parseInt((stage * 5) * (2 ** line));
    this.curr += score;
    this.total += score;
    this.listener();
  }

  clear() {
    this.curr = 0;
    this.total = 0;
  }
}