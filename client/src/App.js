import React, { PureComponent } from 'react';
import AddPlayer from './AddPlayer';
import AddTeam from './AddTeam';
import Games from './Games';
import Leaderboard from './Leaderboard';
import RegisterGame from './RegisterGame';
import Api from './Api';

export default class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      games: [],
      leaderboard: [],
      players: [],
      teams: []
    };

    this.fetchAll = this.fetchAll.bind(this);
    this.fetchGames = this.fetchGames.bind(this);
    this.fetchLeaderboard = this.fetchLeaderboard.bind(this);
    this.fetchPlayers = this.fetchPlayers.bind(this);
    this.handleGameRegistered = this.handleGameRegistered.bind(this);
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    this.fetchGames();
    this.fetchLeaderboard();
    this.fetchPlayers();
  }

  fetchGames() {
    Api.getSingles()
      .then(games => this.setState({ games: games }));
  }

  fetchLeaderboard() {
    Api.getLeaderboard()
      .then(leaderboard => this.setState({ leaderboard: leaderboard }));
  }

  fetchPlayers() {
    Api.getPlayers()
      .then(players => this.setState({ players: players }));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="column">
            <Leaderboard leaderboard={this.state.leaderboard} />
          </div>
          <div className="column">
            <Games games={this.state.games} />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <RegisterGame type="singles" players={this.state.players} callback={this.handleGameRegistered} />
          </div>
          <div className="column">
            <RegisterGame type="doubles" players={this.state.teams} callback={this.handleGameRegistered} />
          </div>
        </div>
        <AddPlayer callback={this.fetchAll} />
        <AddTeam players={this.state.players} callback={this.fetchAll} />
      </div>
    );
  }

  handleGameRegistered() {
    this.fetchGames();
    this.fetchLeaderboard();
  }
}
