const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(databaseName) {
    this.databaseName = databaseName;
  }

  addPlayer(name) {
    const db = new sqlite3.Database(this.databaseName);

    const statement = db.prepare('INSERT INTO player (name) VALUES (?)');
    statement.run(name);
    statement.finalize();

    db.close();
  }
}

module.exports = Database;
