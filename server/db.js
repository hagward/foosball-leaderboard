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

  query(callback) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(this.databaseName);
      callback(db, resolve, reject);
      db.close();
    });
  }
}

module.exports = Database;
