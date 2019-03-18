import React, { useState } from "react";
import Api from "../Api";

export default function AddPlayer({ callback }) {
  const [name, setName] = useState("");

  const nameChanged = event => setName(event.target.value);
  const addPlayer = event => {
    event.preventDefault();

    Api.addPlayer(name).then(() => {
      setName("");
      callback();
    });
  };

  return (
    <section>
      <h2>Add player</h2>
      <form>
        <fieldset>
          <label htmlFor="nameField">Name</label>
          <input
            placeholder="Adelbert Steiner"
            id="nameField"
            type="text"
            value={name}
            onChange={nameChanged}
          />
          <input
            className="button-primary"
            value="Add player"
            type="submit"
            onClick={addPlayer}
          />
        </fieldset>
      </form>
    </section>
  );
}
