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
            <div className="row">
              <div className="column">
                <label htmlFor="playerASelect">Player A</label>
                {this.renderPlayerSelect('playerASelect', this.state.playerAName)}
              </div>
              <div className="column">
                <label htmlFor="playerAField">Player A score</label>
                <input placeholder="1" id="playerAField" type="number" value={this.state.playerAScore} onChange={this.handleScoreChanged} />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="playerBSelect">Player B</label>
                {this.renderPlayerSelect('playerBSelect', this.state.playerBName)}
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
          <option key={player} value={player}>{player}</option>
        )}
      </select>
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
