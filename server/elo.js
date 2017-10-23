class Elo {
  newRatings(score, otherScore, rating, otherRating) {
    const p = Math.round(this.pointsChange(score - otherScore, rating - otherRating));
    return [rating + p, otherRating - p];
  }

  pointsChange(goalDifference, ratingDifference) {
    const k = this.k();
    const result = this.result(goalDifference);
    const expected = this.expected(ratingDifference);
    return this.p(k, result, expected);
  }

  k() {
    return 50;
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
    return 1/(Math.pow(10, -ratingDifference/1000) + 1);
  }

  p(k, result, expected) {
    return k * (result - expected);
  }
}

module.exports = new Elo();
