const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(databaseName) {
    this.databaseName = databaseName;
  }

  addPlayer(name) {
    return this.query((db, resolve, reject) => {
      const statement = db
        .prepare('INSERT INTO player (name) VALUES (?)')
        .run(name, error => error ? reject(error) : resolve());
      statement.finalize();
    });
  }

  addTeam(name, playerAId, playerBId) {
    return this.query((db, resolve, reject) => {
      const statement = db
        .prepare('INSERT INTO team (name, player_a_id, player_b_id) VALUES (?, ?, ?)')
        .run(name, playerAId, playerBId, error => error ? reject(error) : resolve());
      statement.finalize();
    });
  }

  getTwoRatings(playerId1, playerId2) {
    return this.query((db, resolve, reject) =>
      db.get(
        `
        SELECT a.rating AS ratingA, b.rating AS ratingB
        FROM player AS a
        LEFT JOIN player AS b
        WHERE a.id = (?) AND b.id = (?)
        `,
        playerId1, playerId2,
        (error, row) => error ? reject(error) : resolve(row)
      )
    );
  }

  getTeamRatings(teamAId, teamBId) {
    return this.query((db, resolve, reject) => {
      db.get(
        `
        SELECT a.rating AS ratingA, b.rating AS ratingB
        FROM team AS a
        LEFT JOIN team AS b
        WHERE a.id = ? AND b.id = ?
        `,
        teamAId, teamBId,
        (error, row) => error ? reject(error) : resolve(row))
    });
  }

  getPlayers() {
    return this.query((db, resolve, reject) =>
      db.all(
        'SELECT id, name, rating FROM player',
        (error, rows) => error ? reject(error) : resolve(rows)
      )
    );
  }

  getTeams() {
    return this.query((db, resolve, reject) =>
      db.all(
        'SELECT id, name, rating FROM team',
        (error, rows) => error ? reject(error) : resolve(rows)
      )
    );
  }

  addSinglesGame(playerA, playerB) {
    return this.queries(
      (db, resolve, reject) => {
        const statement = db
          .prepare(
            `
            INSERT INTO game_singles (
              player_a_id, player_b_id, player_a_score, player_b_score
            )
            VALUES (?, ?, ?, ?)
            `
          )
          .run(
            playerA.id, playerB.id, playerA.score, playerB.score,
            error => error ? reject(error) : resolve()
          );
        statement.finalize();
      },
      (db, resolve, reject) => {
        const statement = db
          .prepare('UPDATE player SET rating = (?) WHERE id = (?)')
          .run(playerA.newRating, playerA.id, error => error ? reject(error) : resolve());
        statement.finalize();
      },
      (db, resolve, reject) => {
        const statement = db
          .prepare('UPDATE player SET rating = (?) WHERE id = (?)')
          .run(playerB.newRating, playerB.id, error => error ? reject(error) : resolve());
        statement.finalize();
      }
    );
  }

  addDoublesGame(teamA, teamB) {
    return this.query(
      (db, resolve, reject) => {
        let statement = db
          .prepare(
            `
            INSERT INTO game_doubles (
              team_a_id, team_b_id, team_a_score, team_b_score
            )
            VALUES (?, ?, ?, ?)
            `
          )
          .run(
            teamA.id, teamB.id, teamA.score, teamB.score,
            error => { if (error) reject(error) }
          );
        statement.finalize();

        statement = db
          .prepare('UPDATE team SET rating = (?) WHERE id = (?)')
          .run(teamA.newRating, teamA.id, error => { if (error) reject(error) });
        statement.finalize();

        statement = db
          .prepare('UPDATE team SET rating = (?) WHERE id = (?)')
          .run(teamB.newRating, teamB.id, error => error ? reject(error) : resolve());
        statement.finalize();
      }
    );
  }

  getLatestSinglesGames(n) {
    return this.query((db, resolve, reject) =>
      db.all(
        `
        SELECT
          g.id,
          g.created_timestamp,
          p1.name AS player_a_name,
          p2.name AS player_b_name,
          g.player_a_score,
          g.player_b_score
        FROM game_singles AS g
        INNER JOIN player AS p1 ON p1.id = player_a_id
        INNER JOIN player AS p2 ON p2.id = player_b_id
        ORDER BY created_timestamp DESC
        LIMIT (?)
        `,
        n,
        (error, rows) => error ? reject(error) : resolve(rows)
      )
    );
  }

  getPlayerStatistics(playerId) {
    return this.query((db, resolve, reject) =>
      db.get(
        `
        SELECT COUNT(
          CASE WHEN
            (player_a_id = ? AND player_a_score > player_b_score) OR
            (player_b_id = ? AND player_b_score > player_a_score)
          THEN 1 ELSE NULL
          END
        )*1.0/COUNT(id) AS win_ratio
        FROM game_singles
        WHERE player_a_id = ? OR player_b_id = ?
        `,
        playerId, playerId, playerId, playerId,
        (error, row) => error ? reject(error) : resolve(row)
      )
    );
  }

  query(callback) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(this.databaseName);
      db.serialize(() => callback(db, resolve, reject));
      db.close();
    });
  }

  queries(...callbacks) {
    const db = new sqlite3.Database(this.databaseName);
    const promises = callbacks.map(callback =>
      new Promise((resolve, reject) => callback(db, resolve, reject)));
    return Promise
      .all(promises)
      .then(() => {
        db.close();
        return Promise.resolve();
      });
  }
}

module.exports = Database;
