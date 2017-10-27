/**
 * Taken from https://math.stackexchange.com/questions/1723020/accounting-for-uncertainty-in-an-elo-rating-system-for-foosball
 */
class Elo {
  getNewRatings(rating, opponentRating, score, opponentScore) {
    const p = Math.round(this.pointsChange(rating, opponentRating, score, opponentScore));
    return [rating + p, opponentRating - p];
  }

  pointsChange(rating, opponentRating, score, opponentScore) {
    return 10 * (score - opponentScore - this.expectedMatch(rating, opponentRating));
  }

  expectedMatch(rating, opponentRating) {
    return 20 * (this.expectedGoal(rating, opponentRating) - 1/2);
  }

  expectedGoal(rating, opponentRating) {
    return 1/(1 + Math.pow(10, (opponentRating - rating)/800));
  }
}

module.exports = new Elo();
