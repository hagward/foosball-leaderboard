import React, { useState } from "react";
import Api from "../Api";

export default function AddTeam({ players, callback }) {
  const [name, setName] = useState("");
  const [selectedIds, setSelectedIds] = useState({
    playerA: "",
    playerB: ""
  });

  const renderPlayerSelect = (id, name, value) => (
    <select id={id} name={name} value={value} onChange={handlePlayerChange}>
      <option value="" disabled>
        Select player
      </option>
      {players.map(player => (
        <option key={player.id} value={player.id}>
          {player.name}
        </option>
      ))}
    </select>
  );

  const handleClick = event => {
    event.preventDefault();

    Api.addTeam(name, selectedIds.playerA, selectedIds.playerB).then(() => {
      setName("");
      setSelectedIds({ playerA: "", playerB: "" });
      callback();
    });
  };

  const handleNameChange = event => setName(event.target.value);

  const handlePlayerChange = event => {
    const target = event.target;
    setSelectedIds({ ...selectedIds, [target.name]: target.value });
  };

  return (
    <section>
      <h2>Add team</h2>
      <form>
        <fieldset>
          <div className="row">
            <div className="column">
              <label htmlFor="team-name">Name</label>
              <input
                placeholder="Dream Team"
                id="team-name"
                name="name"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="column">
              <label htmlFor="team-player-a-select">Player A</label>
              {renderPlayerSelect(
                "team-player-a-select",
                "playerA",
                selectedIds.playerA
              )}
            </div>
            <div className="column">
              <label htmlFor="team-player-b-select">Player B</label>
              {renderPlayerSelect(
                "team-player-b-select",
                "playerB",
                selectedIds.playerB
              )}
            </div>
          </div>
          <input
            className="button-primary"
            value="Add team"
            type="submit"
            onClick={handleClick}
          />
        </fieldset>
      </form>
    </section>
  );
}
