const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const elo = require('./elo');

const leaderboard = [];
const ratings = {};
const players = [];
const games = [];

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/leaderboard', (req, res) => {
  res.send({ leaderboard: leaderboard });
});

app.get('/api/players', (req, res) => {
  res.send({ players: players });
});

app.get('/api/games', (req, res) => {
  res.send({ games: games });
});

app.post('/api/player', (req, res) => {
  const player = addPlayer(req.body.name);

  if (player) {
    res.send(player);
  } else {
    res.sendStatus(400);
  }

  console.log(ratings);
  console.log(leaderboard);
  console.log('---');
});

app.post('/api/game', (req, res) => {
  const a = req.body.a;
  const b = req.body.b;

  const [newRatingA, newRatingB] = elo.newRatings(a.score, b.score, ratings[a.name], ratings[b.name]);

  if (!ratings[a.name] || !ratings[b.name] || !newRatingA || !newRatingB) {
    res.sendStatus(400);
    return;
  }

  updateRating(a.name, newRatingA);
  updateRating(b.name, newRatingB);
  sortLeaderboard();

  games.unshift(req.body);

  res.send({
    a: {
      name: a.name,
      rating: newRatingA
    },
    b: {
      name: b.name,
      rating: newRatingB
    }
  });
});

function addPlayer(name) {
  if (ratings[name]) {
    return undefined;
  }

  const initialRating = 1500;
  ratings[name] = initialRating;
  players.push(name);
  players.sort();

  const player = { name: name, rating: initialRating };
  leaderboard.push(player);
  sortLeaderboard();

  return player;
}

function updateRating(name, rating) {
  if (ratings[name]) {
    ratings[name] = rating;
  }

  const record = leaderboard.find(player => player.name === name);
  if (record) {
    record.rating = rating;
  }
}

function sortLeaderboard() {
  leaderboard.sort((a, b) => b.rating - a.rating);
}

app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
});
