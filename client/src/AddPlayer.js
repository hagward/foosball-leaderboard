import React, { PureComponent } from 'react';

export default class AddPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };

    this.addPlayer = this.addPlayer.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
  }

  render() {
    return (
      <section>
        <h2>Add player</h2>
        <form>
          <fieldset>
            <label htmlFor="nameField">Name</label>
            <input placeholder="Adelbert Steiner" id="nameField" type="text" value={this.state.name} onChange={this.nameChanged} />
            <input className="button-primary" value="Add" type="submit" onClick={this.addPlayer} />
          </fieldset>
        </form>
      </section>
    );
  }

  nameChanged(event) {
    this.setState({ name: event.target.value });
  }

  addPlayer(event) {
    event.preventDefault();

    fetch('http://localhost:3001/api/player', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name
      })
    })
    .then(response => {
      this.setState({ name: '' });
      this.props.callback();
    });
  }
}
