import React, { useState } from "react";
import Select from "./Select";
import Api from "../Api";

export default function AddTeam({ players, callback }) {
  const [name, setName] = useState("");
  const [selectedIds, setSelectedIds] = useState({
    playerA: "",
    playerB: ""
  });

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
              <Select
                defaultOption="Select player"
                id="team-player-a-select"
                items={players}
                label="Player A"
                name="playerA"
                onChange={handlePlayerChange}
                value={selectedIds.playerA}
              />
            </div>
            <div className="column">
              <Select
                defaultOption="Select player"
                id="team-player-b-select"
                items={players}
                label="Player B"
                name="playerB"
                onChange={handlePlayerChange}
                value={selectedIds.playerB}
              />
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
