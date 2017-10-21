class Elo {
  newRatings(score, otherScore, rating, otherRating) {
    const p = Math.round(this.pointsChange(score - otherScore, rating - otherRating));
    return [rating + p, otherRating - p];
  }

  pointsChange(goalDifference, ratingDifference) {
    const g = this.g(Math.abs(goalDifference));
    const result = this.result(goalDifference);
    const expected = this.expected(ratingDifference);
    return this.p(20, g, result, expected);
  }

  g(goalDifference) {
    if (goalDifference <= 1) {
      return 1;
    } else if (goalDifference === 2) {
      return 3/2;
    } else {
      return (11 + goalDifference)/8;
    }
  }

  result(goalDifference) {
    if (goalDifference > 0) {
      return 1;
    } else if (goalDifference < 0) {
      return 0;
    } else {
      return .5;
    }
  }

  expected(ratingDifference) {
    return 1/(Math.pow(10, -ratingDifference/400) + 1);
  }

  p(k, g, result, expected) {
    return k * g * (result - expected);
  }
}

module.exports = new Elo();
