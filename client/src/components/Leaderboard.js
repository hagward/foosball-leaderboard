import React, { useState } from "react";
import Modal from "./Modal";
import Statistics from "./Statistics";
import "./Leaderboard.css";

export default function Leaderboard({ leaderboard, type }) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const renderPlayerLink = (playerId, playerName) => {
    if (type === "singles") {
      return (
        <a
          className="leaderboard__link"
          onClick={() => setSelectedPlayerId(playerId)}
        >
          {playerName}
        </a>
      );
    } else {
      return playerName;
    }
  };

  return (
    <section className="leaderboard">
      <h2>Leaderboard, {type}</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{renderPlayerLink(player.id, player.name)}</td>
              <td>{player.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPlayerId && (
        <Modal onClose={() => setSelectedPlayerId(null)}>
          <Statistics playerId={selectedPlayerId} />
        </Modal>
      )}
    </section>
  );
}
