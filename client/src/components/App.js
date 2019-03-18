import React, { useEffect, useState } from "react";
import AddPlayer from "./AddPlayer";
import AddTeam from "./AddTeam";
import Games from "./Games";
import Leaderboard from "./Leaderboard";
import RegisterGame from "./RegisterGame";
import Api from "../Api";

export default function App() {
  const [games, setGames] = useState([]);
  const [leaderboardSingles, setLeaderboardSingles] = useState([]);
  const [leaderboardDoubles, setLeaderboardDoubles] = useState([]);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = () =>
    Api.getDashboard().then(({ games, players, teams }) => {
      setGames(games);
      setLeaderboardDoubles(sortByRating(teams));
      setLeaderboardSingles(sortByRating(players));
      setPlayers(players);
      setTeams(teams);
    });

  const sortByRating = list => list.slice().sort((a, b) => b.rating - a.rating);

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <Leaderboard type="singles" leaderboard={leaderboardSingles} />
        </div>
        <div className="column">
          <Leaderboard type="doubles" leaderboard={leaderboardDoubles} />
        </div>
      </div>
      <Games games={games} />
      <div className="row">
        <div className="column">
          <RegisterGame
            type="singles"
            players={players}
            callback={fetchDashboard}
          />
        </div>
        <div className="column">
          <RegisterGame
            type="doubles"
            players={teams}
            callback={fetchDashboard}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <AddPlayer callback={fetchDashboard} />
        </div>
        <div className="column">
          <AddTeam players={players} callback={fetchDashboard} />
        </div>
      </div>
    </div>
  );
}
