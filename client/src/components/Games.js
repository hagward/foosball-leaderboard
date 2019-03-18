import React from "react";
import moment from "moment";

export default function Games({ games }) {
  const capitalize = word => word[0].toUpperCase() + word.substr(1);

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
          {games.map(game => {
            const date = moment.utc(game.created_timestamp);
            return (
              <tr key={game.type + game.id}>
                <td>{capitalize(game.type)}</td>
                <td>{game.a_name}</td>
                <td>{game.b_name}</td>
                <td>
                  {game.a_score}:{game.b_score}
                </td>
                <td title={date.local().format("LTS")}>{date.fromNow()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
