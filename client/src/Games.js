import React, { PureComponent } from 'react';
import moment from 'moment';

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
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {this.props.games.map(game => {
              const date = moment.utc(game.created_timestamp);
              return (
                <tr key={game.id}>
                  <td>{game.player_a_name}</td>
                  <td>{game.player_b_name}</td>
                  <td>{game.player_a_score}:{game.player_b_score}</td>
                  <td title={date.local().format('LTS')}>{date.fromNow()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    );
  }
}
