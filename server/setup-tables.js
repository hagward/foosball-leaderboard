const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('foosball.db');

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS player');
  db.run('DROP TABLE IF EXISTS game');

  db.run(`
    CREATE TABLE player (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT UNIQUE NOT NULL,
      rating INTEGER NOT NULL DEFAULT 1500
    )
  `);

  db.run(`
    CREATE TABLE game (
      id INTEGER PRIMARY KEY NOT NULL,
      created_timestamp INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
      player_a_id INTEGER NOT NULL,
      player_b_id INTEGER NOT NULL,
      player_a_score INTEGER NOT NULL,
      player_b_score INTEGER NOT NULL,
      FOREIGN KEY(player_a_id) REFERENCES player(id),
      FOREIGN KEY(player_b_id) REFERENCES player(id)
    )
  `);
});

db.close();
