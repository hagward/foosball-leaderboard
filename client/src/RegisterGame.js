import React, { PureComponent } from 'react';

export default class RegisterGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerAName: '',
      playerBName: '',
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
            <label htmlFor="playerASelect">Player A</label>
            <select id="playerASelect" value={this.state.playerAName} onChange={this.handleNameChanged}>
              <option value="" disabled selected>Select player</option>
              {this.props.players.map(player =>
                <option key={player} value={player}>{player}</option>
              )}
            </select>

            <label htmlFor="playerAField">Player A score</label>
            <input placeholder="1" id="playerAField" type="number" value={this.state.playerAScore} onChange={this.handleScoreChanged} />

            <label htmlFor="playerBSelect">Player B</label>
            <select id="playerBSelect" value={this.state.playerBName} onChange={this.handleNameChanged}>
              <option value="" disabled selected>Select player</option>
              {this.props.players.map(player =>
                <option key={player} value={player}>{player}</option>
              )}
            </select>

            <label htmlFor="playerBField">Player B score</label>
            <input placeholder="1" id="playerBField" type="number" value={this.state.playerBScore} onChange={this.handleScoreChanged} />

            <input className="button-primary" value="Register" type="submit" onClick={this.registerGame} />
          </fieldset>
        </form>
      </section>
    );
  }

  handleNameChanged(event) {
    if (event.target.id === 'playerASelect') {
      this.setState({
        playerAName: event.target.value
      });
    } else {
      this.setState({
        playerBName: event.target.value
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

    fetch('http://localhost:3001/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        a: {
          name: this.state.playerAName,
          score: this.state.playerAScore
        },
        b: {
          name: this.state.playerBName,
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