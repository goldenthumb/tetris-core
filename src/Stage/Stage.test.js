import Stage from './index';

const STAGE = {
  max: 20,
  speed: {
    min: 500,
    max: 100
  },
  count: {
    point: 10,
    times: 3
  }
};

test('initialize', () => {
  const { max, speed, count } = STAGE;
  const stage = new Stage({ max, speed, count });
  stage.next();
});