const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('foosball.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS player (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT UNIQUE NOT NULL,
      rating INTEGER NOT NULL DEFAULT 1500
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS team (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT UNIQUE NOT NULL,
      rating INTEGER NOT NULL DEFAULT 1500
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS player_team (
      player_id INTEGER NOT NULL,
      team_id INTEGER NOT NULL,
      PRIMARY KEY(player_id, team_id),
      FOREIGN KEY(player_id) REFERENCES player(id),
      FOREIGN KEY(team_id) REFERENCES team(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS game (
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
