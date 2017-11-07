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
              <th>Type</th>
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
                  <td>{this.capitalizeWord(game.type)}</td>
                  <td>{game.a_name}</td>
                  <td>{game.b_name}</td>
                  <td>{game.a_score}:{game.b_score}</td>
                  <td title={date.local().format('LTS')}>{date.fromNow()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    );
  }

  capitalizeWord(word) {
    return word[0].toUpperCase() + word.substr(1);
  }
}
