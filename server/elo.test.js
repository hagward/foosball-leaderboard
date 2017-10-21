const elo = require('./elo');

// Examples taken from https://en.wikipedia.org/wiki/World_Football_Elo_Ratings#Examples

describe('pointsChange', () => {
  test('Team A (630) vs. Team B (500) - 3:1', () => {
    expect(elo.pointsChange(2, 130)).toBeCloseTo(9.64);
    expect(elo.pointsChange(-2, -130)).toBeCloseTo(-9.64);
  });

  test('Team A (630) vs. Team B (500) - 1:3', () => {
    expect(elo.pointsChange(-2, 130)).toBeCloseTo(-20.36);
    expect(elo.pointsChange(2, -130)).toBeCloseTo(20.36);
  });

  test('Team A (630) vs. Team B (500) - 2:2', () => {
    expect(elo.pointsChange(0, 130)).toBeCloseTo(-3.58);
    expect(elo.pointsChange(0, -130)).toBeCloseTo(3.58);
  });
});

describe('newRating', () => {
  test('Team B (500) vs. Team C (480) - 3:1', () => {
    expect(elo.newRating(3, 1, 500, 480)).toBe(514);
    expect(elo.newRating(1, 3, 480, 500)).toBe(466);
  });

  test('Team B (500) vs. Team C (480) - 1:3', () => {
    expect(elo.newRating(1, 3, 500, 480)).toBe(484);
    expect(elo.newRating(3, 1, 480, 500)).toBe(496);
  });

  test('Team B (500) vs. Team C (480) - 2:2', () => {
    expect(elo.newRating(2, 2, 500, 480)).toBe(499);
    expect(elo.newRating(2, 2, 480, 500)).toBe(481);
  });
});
