import React, { PureComponent } from 'react';
import Modal from './Modal';
import Statistics from './Statistics';
import './Leaderboard.css';

export default class Leaderboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlayerId: null
    };
  }

  render() {
    return (
      <section className="leaderboard">
        <h2>Leaderboard, {this.props.type}</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leaderboard.map((player, index) =>
              <tr key={player.id}>
                <td>{index + 1}</td>
                <td>{this.renderPlayerLink(player.id, player.name)}</td>
                <td>{player.rating}</td>
              </tr>
            )}
          </tbody>
        </table>
        {this.state.selectedPlayerId &&
          <Modal onClose={() => this.setState({ selectedPlayerId: null })}>
            <Statistics playerId={this.state.selectedPlayerId} />
          </Modal>
        }
      </section>
    );
  }

  renderPlayerLink(playerId, playerName) {
    if (this.props.type === 'singles') {
      return <a className="leaderboard__link" onClick={() => this.setState({ selectedPlayerId: playerId })}>{playerName}</a>;
    } else {
      return playerName;
    }
  }
}
