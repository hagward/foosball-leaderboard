const elo = require('./elo');

describe('newRatings', () => {
  test('Player A (1800) beats Player B (1550)', () => {
    expect(elo.newRatings(3, 1, 1800, 1550)).toEqual([1818, 1532]);
  });

  test('Player A (1800) loses to Player B (1550)', () => {
    expect(elo.newRatings(1, 3, 1800, 1550)).toEqual([1768, 1582]);
  });
});
