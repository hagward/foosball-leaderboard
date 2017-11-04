import React, { PureComponent } from 'react';
import AddPlayer from './AddPlayer';
import Games from './Games';
import Leaderboard from './Leaderboard';
import RegisterGame from './RegisterGame';

export default class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      games: [],
      leaderboard: [],
      players: []
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
    fetch('/api/singles', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(games => this.setState({ games: games }));
  }

  fetchLeaderboard() {
    fetch('/api/leaderboard', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(leaderboard => this.setState({ leaderboard: leaderboard }));
  }

  fetchPlayers() {
    fetch('/api/players', {
      method: 'GET'
    })
    .then(response => response.json())
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
        <RegisterGame players={this.state.players} callback={this.handleGameRegistered} />
        <AddPlayer callback={this.fetchAll} />
      </div>
    );
  }

  handleGameRegistered() {
    this.fetchGames();
    this.fetchLeaderboard();
  }
}
