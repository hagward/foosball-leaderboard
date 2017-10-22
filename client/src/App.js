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
    fetch('http://localhost:3001/api/games', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => this.setState(json));
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
        <Games games={this.state.games} />
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
