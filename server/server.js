const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Database = require('./db');
const elo = require('./elo');

const db = new Database('foosball.db');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', express.static('../client/build'));

app.get('/api/leaderboard', (req, res) => {
  db.getLeaderboard()
    .then(leaderboard => res.send(leaderboard))
    .catch(error => {
      console.log(error);
      res.sendStatus(400);
    });
});

app.get('/api/players', (req, res) => {
  db.getPlayers()
    .then(players => res.send(players))
    .catch(error => {
      console.log(error);
      res.sendStatus(400);
    });
});

app.get('/api/games', (req, res) => {
  db.getLatestGames(10)
    .then(games => res.send(games))
    .catch(error => {
      console.log(error);
      res.sendStatus(400);
    });
});

app.post('/api/player', (req, res) => {
  db.addPlayer(req.body.name)
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log(error);
      res.sendStatus(400);
    });
});

app.post('/api/game', (req, res) => {
  const a = req.body.a;
  const b = req.body.b;

  db.getTwoRatings(a.id, b.id)
    .then(row => {
      const [newRatingA, newRatingB] = elo.newRatings(a.score, b.score, row.ratingA, row.ratingB);

      if (!newRatingA || !newRatingB || a.id === b.id) {
        return Promise.reject();
      } else {
        return db.addGame({
            id: a.id,
            score: a.score,
            newRating: newRatingA
          }, {
            id: b.id,
            score: b.score,
            newRating: newRatingB
          }
        );
      }
    })
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log(error);
      res.sendStatus(400);
    });
});

app.listen(3001, () => {
  console.log('foosball-server listening on port 3001!')
});
