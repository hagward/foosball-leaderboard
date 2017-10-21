import React, { PureComponent } from 'react';

export default class Leaderboard extends PureComponent {
  render() {
    return (
      <section>
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leaderboard.map(record =>
              <tr key={record.name}>
                <td>{record.name}</td>
                <td>{record.rating}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    );
  }
}
