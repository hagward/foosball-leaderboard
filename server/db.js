const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(databaseName) {
    this.databaseName = databaseName;
  }

  addPlayer(name) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(this.databaseName);

      const statement = db
        .prepare('INSERT INTO player (name) VALUES (?)')
        .run(name, error => error ? reject(error) : resolve());
      statement.finalize();

      db.close();
    });
  }
}

module.exports = Database;
