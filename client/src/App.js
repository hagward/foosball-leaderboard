import React, { PureComponent } from 'react';
import AddPlayer from './AddPlayer';
import Leaderboard from './Leaderboard';
import RegisterGame from './RegisterGame';

export default class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      leaderboard: [],
      players: []
    };

    this.fetchAll = this.fetchAll.bind(this);
    this.fetchLeaderboard = this.fetchLeaderboard.bind(this);
    this.fetchPlayers = this.fetchPlayers.bind(this);
  }

  componentDidMount() {
    this.fetchLeaderboard();
    this.fetchPlayers();
  }

  fetchAll() {
    this.fetchLeaderboard();
    this.fetchPlayers();
  }

  fetchLeaderboard() {
    fetch('http://localhost:3001/api/leaderboard', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => this.setState(json));
  }

  fetchPlayers() {
    fetch('http://localhost:3001/api/players', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => this.setState(json));
  }

  render() {
    return (
      <div className="container">
        <Leaderboard leaderboard={this.state.leaderboard} />
        <RegisterGame players={this.state.players} callback={this.fetchLeaderboard} />
        <AddPlayer callback={this.fetchAll} />
      </div>
    );
  }
}
