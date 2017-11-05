import React, { PureComponent } from 'react';

export default class Leaderboard extends PureComponent {
  render() {
    return (
      <section>
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
                <td>{player.name}</td>
                <td>{player.rating}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    );
  }
}
