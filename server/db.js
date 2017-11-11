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

  getLatestGames(n) {
    return this.query((db, resolve, reject) =>
      db.all(
        `
        SELECT * from (
          SELECT
            gs.id,
            gs.created_timestamp,
            p1.name AS a_name,
            p2.name AS b_name,
            gs.player_a_score AS a_score,
            gs.player_b_score AS b_score,
            'singles' AS type
          FROM game_singles AS gs
            INNER JOIN player AS p1 ON p1.id = player_a_id
            INNER JOIN player AS p2 ON p2.id = player_b_id
          UNION ALL
          SELECT
            gd.id,
            gd.created_timestamp,
            t1.name AS a_name,
            t2.name AS b_name,
            gd.team_a_score AS a_score,
            gd.team_b_score AS b_score,
            'doubles' AS type
          FROM game_doubles AS gd
            INNER JOIN team AS t1 ON t1.id = team_a_id
            INNER JOIN team AS t2 ON t2.id = team_b_id
        )
        ORDER BY created_timestamp DESC
        LIMIT ?
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
        SELECT
          COUNT(*) AS total,
          COUNT(
            CASE WHEN
              (player_a_id = ? AND player_a_score > player_b_score) OR
              (player_b_id = ? AND player_b_score > player_a_score)
            THEN 1 ELSE NULL
            END
          ) AS wins
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
