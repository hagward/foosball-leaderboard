import React, { useState } from "react";
import Select from "./Select";
import Api from "../Api";

export default function RegisterGame({ callback, players, type }) {
  const [playerIds, setPlayerIds] = useState({
    playerA: "",
    playerB: ""
  });
  const [scores, setScores] = useState({
    playerA: "",
    playerB: ""
  });

  const playerText = type === "doubles" ? "team" : "player";
  const playerTextCapitalized = type === "doubles" ? "Team" : "Player";

  const renderScoreInput = (id, name, value) => {
    return (
      <input
        id={id}
        name={name}
        type="number"
        placeholder="0-10"
        min="0"
        max="10"
        value={value}
        onChange={handleScoreChange}
      />
    );
  };

  const handlePlayerChange = event => {
    const target = event.target;
    setPlayerIds({ ...playerIds, [target.name]: target.value });
  };

  const handleScoreChange = event => {
    const target = event.target;
    setScores({ ...scores, [target.name]: target.value });
  };

  const registerGame = event => {
    event.preventDefault();

    Api.addGame(
      type,
      playerIds.playerA,
      scores.playerA,
      playerIds.playerB,
      scores.playerB
    ).then(() => {
      setScores({
        playerA: "",
        playerB: ""
      });
      callback();
    });
  };

  return (
    <section>
      <h2>Register game, {type}</h2>
      <form>
        <fieldset>
          <div className="row">
            <div className="column">
              <Select
                defaultOption={`Select ${playerText}`}
                id="singles-player-a-select"
                items={players}
                label={`${playerTextCapitalized} A`}
                name="playerA"
                onChange={handlePlayerChange}
                value={playerIds.playerA}
              />
            </div>
            <div className="column">
              <Select
                defaultOption={`Select ${playerText}`}
                id="singles-player-b-select"
                items={players}
                label={`${playerTextCapitalized} B`}
                name="playerB"
                onChange={handlePlayerChange}
                value={playerIds.playerB}
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <label htmlFor="singles-player-a-score">
                {playerTextCapitalized} A score
              </label>
              {renderScoreInput(
                "singles-player-a-score",
                "playerA",
                scores.playerA
              )}
            </div>
            <div className="column">
              <label htmlFor="singles-player-b-score">
                {playerTextCapitalized} B score
              </label>
              {renderScoreInput(
                "singles-player-b-score",
                "playerB",
                scores.playerB
              )}
            </div>
          </div>
          <input
            className="button-primary"
            value="Register game"
            type="submit"
            onClick={registerGame}
          />
        </fieldset>
      </form>
    </section>
  );
}
