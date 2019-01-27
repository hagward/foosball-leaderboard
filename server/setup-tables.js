const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("foosball.db");

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
      player_a_id INTEGER NOT NULL,
      player_b_id INTEGER NOT NULL,
      rating INTEGER NOT NULL DEFAULT 1500,
      FOREIGN KEY(player_a_id) REFERENCES player(id),
      FOREIGN KEY(player_b_id) REFERENCES player(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS game_singles (
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

  db.run(`
    CREATE TABLE IF NOT EXISTS game_doubles (
      id INTEGER PRIMARY KEY NOT NULL,
      created_timestamp INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
      team_a_id INTEGER NOT NULL,
      team_b_id INTEGER NOT NULL,
      team_a_score INTEGER NOT NULL,
      team_b_score INTEGER NOT NULL,
      FOREIGN KEY(team_a_id) REFERENCES team(id),
      FOREIGN KEY(team_b_id) REFERENCES team(id)
    )
  `);
});

db.close();
