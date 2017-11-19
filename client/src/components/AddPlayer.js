import React, { PureComponent } from 'react';
import Api from '../Api';

export default class AddPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  render() {
    return (
      <section>
        <h2>Add player</h2>
        <form>
          <fieldset>
            <label htmlFor="nameField">Name</label>
            <input placeholder="Adelbert Steiner" id="nameField" type="text" value={this.state.name} onChange={this.nameChanged} />
            <input className="button-primary" value="Add player" type="submit" onClick={this.addPlayer} />
          </fieldset>
        </form>
      </section>
    );
  }

  nameChanged = (event) => {
    this.setState({ name: event.target.value });
  }

  addPlayer = (event) => {
    event.preventDefault();

    Api.addPlayer(this.state.name)
      .then(response => {
        this.setState({ name: '' });
        this.props.callback();
      });
  }
}
