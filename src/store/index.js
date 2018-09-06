export const state = {
  counter: {
    count: 0
  }
};

export const actions = {
  counter: {
    down: value => counter => ({ count: counter.count - value }),
    up: value => counter => ({ count: counter.count + value })
  }
};
