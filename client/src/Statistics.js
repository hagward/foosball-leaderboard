import React, { PureComponent } from 'react';
import Api from './Api';
import './Statistics.css';

export default class Statistics extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    Api.getPlayerStatistics(this.props.playerId)
      .then(statistics => this.setState(statistics));
  }

  render() {
    return (
      <section className="statistics">
        <h2>{this.state.name}</h2>
        <ul className="statistics__list">
          <li>Rating: {this.state.rating}</li>
          <li>Games played: {this.state.games}</li>
          <li>Win percentage: {this.winRatioPercent()}%</li>
        </ul>
      </section>
    );
  }

  winRatioPercent() {
    const winRatio = this.state.wins / Math.max(this.state.games, 1);
    return Number(winRatio * 100).toFixed(1);
  }
}
