function numbersOfCastles(stretchOfLand) {
  let countCastles = 1;
  let current,
    previous,
    next,
    state;

  if (!stretchOfLand || !stretchOfLand.length) {
    return 0;
  }
  if (stretchOfLand.length === 1) {
    return 1;
  }

  for (let i = 1; i < stretchOfLand.length - 1; i++) {
    previous = stretchOfLand[i - 1];
    current = stretchOfLand[i];
    next = stretchOfLand[i + 1];

    // Peak: 1 5 2
    if (current > previous && current > next) {
      countCastles++;
      state = 'down';
    }
    // Valley: 9 2 9
    else if (current < previous && current < next) {
      countCastles++;
      state = 'up';
    }
    // 2 6 8
    else if (previous < current && current >= next) {
      state = 'up';
    }
    // 9 5 2
    else if (current < previous && current >= next) {
      state = 'down';
    }
    // Peak: _ 6 3
    else if (next < current && state === 'up') {
      countCastles++;
      state = 'down';
    }
    // Valley: _ 1 9
    else if (next > current && state === 'down') {
      countCastles++;
      state = 'up';
    }
  }

  return countCastles;
}

module.exports = numbersOfCastles;