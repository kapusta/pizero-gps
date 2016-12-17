/**
  @see https://en.wikipedia.org/wiki/Grade_(climbing)
*/
const yds = new Array(16).fill(0).map((val, idx) => {
  return {
    'value': '5.' + idx,
    'label': '5.' + idx
  };
});

const hueco = new Array(18).fill(0).map((val, idx) => {
  return {
    'value': 'V' + idx,
    'label': 'V' + idx
  };
});

export {
  yds,
  hueco
};
