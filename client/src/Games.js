import React, { PureComponent } from 'react';

export default class Games extends PureComponent {
  render() {
    return (
      <section>
        <h2>Latest games</h2>
        <table>
          <thead>
            <tr>
              <th>Player A</th>
              <th>Player B</th>
              <th>Result</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.games.map(game =>
              <tr key={game.id}>
                <td>{game.player_a_name}</td>
                <td>{game.player_b_name}</td>
                <td>{game.player_a_score}:{game.player_b_score}</td>
                <td>{game.created_timestamp}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    );
  }
}
