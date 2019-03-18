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
    fetchAll();
  }, []);

  const fetchAll = () => {
    fetchGames();
    fetchPlayers();
    fetchTeams();
  };

  const fetchGames = () => Api.getSingles().then(setGames);

  const fetchPlayers = () =>
    Api.getPlayers().then(players => {
      setPlayers(
        players.slice().sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          } else {
            return 0;
          }
        })
      );
      setLeaderboardSingles(
        players.slice().sort((a, b) => b.rating - a.rating)
      );
    });

  const fetchTeams = () =>
    Api.getTeams().then(teams => {
      setTeams(
        teams.slice().sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          } else {
            return 0;
          }
        })
      );
      setLeaderboardDoubles(teams.slice().sort((a, b) => b.rating - a.rating));
    });

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
          <RegisterGame type="singles" players={players} callback={fetchAll} />
        </div>
        <div className="column">
          <RegisterGame type="doubles" players={teams} callback={fetchAll} />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <AddPlayer callback={fetchAll} />
        </div>
        <div className="column">
          <AddTeam players={players} callback={fetchAll} />
        </div>
      </div>
    </div>
  );
}
