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

  getPlayers() {
    return this.query((db, resolve, reject) =>
      db.all(
        'SELECT id, name FROM player ORDER BY name',
        (error, rows) => error ? reject(error) : resolve(rows)
      )
    );
  }

  getLatestGames(n) {
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
        FROM game AS g
        INNER JOIN player AS p1 ON p1.id = player_a_id
        INNER JOIN player AS p2 ON p2.id = player_b_id
        ORDER BY created_timestamp DESC
        LIMIT (?)
        `,
        n,
        (error, rows) => error ? reject(error) : resolve (rows)
      )
    );
  }

  query(callback) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(this.databaseName);
      callback(db, resolve, reject);
      db.close();
    });
  }
}

module.exports = Database;
