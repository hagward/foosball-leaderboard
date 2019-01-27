const elo = require("./elo");

describe("getNewRatings", () => {
  test("Player A (1800) beats Player B (1550)", () => {
    expect(elo.getNewRatings(1800, 1550, 10, 5)).toEqual([1815, 1535]);
  });

  test("Player A (1800) loses to Player B (1550)", () => {
    expect(elo.getNewRatings(1800, 1550, 5, 10)).toEqual([1715, 1635]);
  });
});
