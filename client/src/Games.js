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
            </tr>
          </thead>
          <tbody>
            {this.props.games.map((game, index) =>
              <tr key={index}>
                <td>{game.a.name}</td>
                <td>{game.b.name}</td>
                <td>{game.a.score}:{game.b.score}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    );
  }
}
