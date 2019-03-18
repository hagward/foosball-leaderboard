export default class Api {
  static addPlayer(name) {
    return post("/api/player", { name });
  }

  static addGame(type, playerAId, playerAScore, playerBId, playerBScore) {
    return post(`/api/${type}`, {
      a: {
        id: playerAId,
        score: playerAScore
      },
      b: {
        id: playerBId,
        score: playerBScore
      }
    });
  }

  static addTeam(name, playerAId, playerBId) {
    return post("/api/team", {
      name: name,
      playerAId: playerAId,
      playerBId: playerBId
    });
  }

  static getSingles() {
    return get("/api/singles");
  }

  static getPlayers() {
    return get("/api/players");
  }

  static getTeams() {
    return get("/api/teams");
  }

  static getPlayerStatistics(playerId) {
    return get(`/api/player/${playerId}`);
  }
}

function get(url) {
  return fetch(url).then(response => response.json());
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}
