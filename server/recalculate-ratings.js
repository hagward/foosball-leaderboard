const sqlite3 = require("sqlite3").verbose();
const elo = require("./elo");
const db = new sqlite3.Database("foosball.db");

function getNumPlayers() {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(id) AS players FROM player", (error, row) =>
      error ? reject(error) : resolve(row.players)
    );
  });
}

function getGames() {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT
      g.player_a_id,
      g.player_b_id,
      pa.name AS player_a,
      pb.name AS player_b,
      pa.rating AS player_a_rating,
      pb.rating AS player_b_rating,
      g.player_a_score,
      g.player_b_score
      FROM game AS g
      INNER JOIN player AS pa ON pa.id = g.player_a_id
      INNER JOIN player AS pb ON pb.id = g.player_b_id
      ORDER BY created_timestamp ASC
      `,
      (error, rows) => (error ? reject(error) : resolve(rows))
    );
  });
}

function getNewRatings() {
  return Promise.all([getNumPlayers(), getGames()]).then(values => {
    const numPlayers = values[0];
    const games = values[1];

    const ratings = [];
    for (let i = 0; i < numPlayers + 1; i++) {
      ratings.push(1500);
    }

    for (const game of games) {
      const newRatings = elo.getNewRatings(
        ratings[game.player_a_id],
        ratings[game.player_b_id],
        game.player_a_score,
        game.player_b_score
      );

      ratings[game.player_a_id] = newRatings[0];
      ratings[game.player_b_id] = newRatings[1];
    }

    return ratings;
  });
}

function updateRatings(ratings) {
  for (let i = 1; i < ratings.length; i++) {
    db.run("UPDATE player SET rating = ? WHERE id = ?", ratings[i], i);
  }
}

db.serialize(() => {
  getNewRatings().then(ratings => {
    updateRatings(ratings);
    db.close();
  });
});
