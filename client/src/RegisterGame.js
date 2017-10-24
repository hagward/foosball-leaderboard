import React, { PureComponent } from 'react';

export default class RegisterGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerAId: '',
      playerBId: '',
      playerAScore: '',
      playerBScore: ''
    };

    this.registerGame = this.registerGame.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleScoreChanged = this.handleScoreChanged.bind(this);
  }

  render() {
    return (
      <section>
        <h2>Register game</h2>
        <form>
          <fieldset>
            <div className="row">
              <div className="column">
                <label htmlFor="playerASelect">Player A</label>
                {this.renderPlayerSelect('playerASelect', this.state.playerAId)}
              </div>
              <div className="column">
                <label htmlFor="playerBSelect">Player B</label>
                {this.renderPlayerSelect('playerBSelect', this.state.playerBId)}
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="playerAField">Player A score</label>
                <input placeholder="1" id="playerAField" type="number" value={this.state.playerAScore} onChange={this.handleScoreChanged} />
              </div>
              <div className="column">
                <label htmlFor="playerBField">Player B score</label>
                <input placeholder="1" id="playerBField" type="number" value={this.state.playerBScore} onChange={this.handleScoreChanged} />
              </div>
            </div>
            <input className="button-primary" value="Register" type="submit" onClick={this.registerGame} />
          </fieldset>
        </form>
      </section>
    );
  }

  renderPlayerSelect(id, value) {
    return (
      <select id={id} value={value} onChange={this.handleNameChanged}>
        <option value="" disabled>Select player</option>
        {this.props.players.map(player =>
          <option key={player.id} value={player.id}>{player.name}</option>
        )}
      </select>
    );
  }

  handleNameChanged(event) {
    if (event.target.id === 'playerASelect') {
      this.setState({
        playerAId: event.target.value
      });
    } else {
      this.setState({
        playerBId: event.target.value
      });
    }
  }

  handleScoreChanged(event) {
    if (event.target.id === 'playerAField') {
      this.setState({
        playerAScore: event.target.value
      });
    } else {
      this.setState({
        playerBScore: event.target.value
      });
    }
  }

  registerGame(event) {
    event.preventDefault();

    fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        a: {
          id: this.state.playerAId,
          score: this.state.playerAScore
        },
        b: {
          id: this.state.playerBId,
          score: this.state.playerBScore
        }
      })
    })
    .then(response => {
      this.setState({
        playerAScore: '',
        playerBScore: ''
      });
      this.props.callback();
    });
  }
}
