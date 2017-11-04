import React, { PureComponent } from 'react';

export default class AddTeam extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      playerAId: '',
      playerBId: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
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
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="column">
                <label htmlFor="team-player-a-select">Player A</label>
                {this.renderPlayerSelect('team-player-a-select', 'playerAId', this.state.playerAId)}
              </div>
              <div className="column">
                <label htmlFor="team-player-b-select">Player B</label>
                {this.renderPlayerSelect('team-player-b-select', 'playerBId', this.state.playerBId)}
              </div>
            </div>
            <input className="button-primary" value="Add team" type="submit" onClick={this.handleClick} />
          </fieldset>
        </form>
      </section>
    );
  }

  renderPlayerSelect(id, name, value) {
    return (
      <select id={id} name={name} value={value} onChange={this.handleChange}>
        <option value="" disabled>Select player</option>
        {this.props.players.map(player =>
          <option key={player.id} value={player.id}>{player.name}</option>
        )}
      </select>
    );
  }

  handleClick(event) {
    event.preventDefault();

    fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        playerAId: this.state.playerAId,
        playerBId: this.state.playerBId
      })
    })
    .then(response => {
      this.setState({
        name: '',
        playerAId: '',
        playerBId: ''
      });
      this.props.callback();
    });
  }

  handleChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }
}