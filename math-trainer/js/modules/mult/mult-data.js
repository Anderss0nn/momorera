const MultData = {
  getRandomFactors(max = 12) {
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    return { a, b, result: a * b };
  }
};