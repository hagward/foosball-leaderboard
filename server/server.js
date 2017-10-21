const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const elo = require('./elo');

const leaderboard = [];
const persons = {};
const players = [];

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

app.post('/api/person', (req, res) => {
  const person = addPerson(req.body.name);

  if (person) {
    res.send(person);
  } else {
    res.sendStatus(400);
  }

  console.log(persons);
  console.log(leaderboard);
  console.log('---');
});

app.post('/api/game', (req, res) => {
  const a = req.body.a;
  const b = req.body.b;

  const [newRatingA, newRatingB] = elo.newRatings(a.score, b.score, persons[a.name], persons[b.name]);

  if (!persons[a.name] || !persons[b.name] || !newRatingA || !newRatingB) {
    res.sendStatus(400);
    return;
  }

  updateRating(a.name, newRatingA);
  updateRating(b.name, newRatingB);
  sortLeaderboard();

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

function addPerson(name) {
  if (persons[name]) {
    return undefined;
  }

  const initialRating = 1500;
  persons[name] = initialRating;
  players.push(name);
  players.sort();

  const person = { name: name, rating: initialRating };
  leaderboard.push(person);
  sortLeaderboard();

  return person;
}

function updateRating(name, rating) {
  if (persons[name]) {
    persons[name] = rating;
  }

  const record = leaderboard.find(person => person.name === name);
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
