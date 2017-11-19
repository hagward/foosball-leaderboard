export default class Api {
  static addPlayer(name) {
    return fetch('/api/player', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name
      })
    });
  }

  static addGame(type, playerAId, playerAScore, playerBId, playerBScore) {
    return fetch('/api/' + type, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        a: {
          id: playerAId,
          score: playerAScore
        },
        b: {
          id: playerBId,
          score: playerBScore
        }
      })
    });
  }

  static addTeam(name, playerAId, playerBId) {
    return fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        playerAId: playerAId,
        playerBId: playerBId
      })
    });
  }

  static getSingles() {
    return fetch('/api/singles', {
      method: 'GET'
    }).then(response => response.json());
  }

  static getPlayers() {
    return fetch('/api/players', {
      method: 'GET'
    }).then(response => response.json());
  }

  static getTeams() {
    return fetch('/api/teams', {
      method: 'GET'
    }).then(response => response.json());
  }

  static getPlayerStatistics(playerId) {
    return fetch('/api/player/' + playerId, {
      method: 'GET',
    }).then(response => response.json());
  }
}
