import React, { PureComponent } from "react";
import AddPlayer from "./AddPlayer";
import AddTeam from "./AddTeam";
import Games from "./Games";
import Leaderboard from "./Leaderboard";
import RegisterGame from "./RegisterGame";
import Api from "../Api";

export default class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      games: [],
      leaderboardSingles: [],
      leaderboardDoubles: [],
      players: [],
      teams: []
    };
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll = () => {
    this.fetchGames();
    this.fetchPlayers();
    this.fetchTeams();
  };

  fetchGames = () => {
    Api.getSingles().then(games => this.setState({ games: games }));
  };

  fetchPlayers = () => {
    Api.getPlayers().then(players =>
      this.setState({
        players: players.slice().sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          } else {
            return 0;
          }
        }),
        leaderboardSingles: players.slice().sort((a, b) => b.rating - a.rating)
      })
    );
  };

  fetchTeams = () => {
    Api.getTeams().then(teams =>
      this.setState({
        teams: teams.slice().sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          } else {
            return 0;
          }
        }),
        leaderboardDoubles: teams.slice().sort((a, b) => b.rating - a.rating)
      })
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="column">
            <Leaderboard
              type="singles"
              leaderboard={this.state.leaderboardSingles}
            />
          </div>
          <div className="column">
            <Leaderboard
              type="doubles"
              leaderboard={this.state.leaderboardDoubles}
            />
          </div>
        </div>
        <Games games={this.state.games} />
        <div className="row">
          <div className="column">
            <RegisterGame
              type="singles"
              players={this.state.players}
              callback={this.fetchAll}
            />
          </div>
          <div className="column">
            <RegisterGame
              type="doubles"
              players={this.state.teams}
              callback={this.fetchAll}
            />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <AddPlayer callback={this.fetchAll} />
          </div>
          <div className="column">
            <AddTeam players={this.state.players} callback={this.fetchAll} />
          </div>
        </div>
      </div>
    );
  }
}
