export default class Api {
  static addPlayer = name => post("/api/player", { name });

  static addGame = (type, playerAId, playerAScore, playerBId, playerBScore) =>
    post(`/api/${type}`, {
      a: {
        id: playerAId,
        score: playerAScore
      },
      b: {
        id: playerBId,
        score: playerBScore
      }
    });

  static addTeam = (name, playerAId, playerBId) =>
    post("/api/team", {
      name: name,
      playerAId: playerAId,
      playerBId: playerBId
    });

  static getDashboard = () => get("/api/dashboard");

  static getSingles = () => get("/api/singles");

  static getPlayers = () => get("/api/players");

  static getTeams = () => get("/api/teams");

  static getPlayerStatistics = playerId => get(`/api/player/${playerId}`);
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
