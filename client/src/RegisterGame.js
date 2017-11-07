import React, { PureComponent } from 'react';
import Api from './Api';

export default class RegisterGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerAId: '',
      playerBId: '',
      playerAScore: '',
      playerBScore: ''
    };

    this.playerText = this.props.type === 'doubles' ? 'team' : 'player';
    this.playerTextCapitalized = this.props.type === 'doubles' ? 'Team' : 'Player';
  }

  render() {
    return (
      <section>
        <h2>Register game, {this.props.type}</h2>
        <form>
          <fieldset>
            <div className="row">
              <div className="column">
                <label htmlFor="singles-player-a-select">{this.playerTextCapitalized} A</label>
                {this.renderPlayerSelect('singles-player-a-select', 'playerAId', this.state.playerAId)}
              </div>
              <div className="column">
                <label htmlFor="singles-player-b-select">{this.playerTextCapitalized} B</label>
                {this.renderPlayerSelect('singles-player-b-select', 'playerBId', this.state.playerBId)}
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="singles-player-a-score">{this.playerTextCapitalized} A score</label>
                {this.renderScoreInput('singles-player-a-score', 'playerAScore', this.state.playerAScore)}
              </div>
              <div className="column">
                <label htmlFor="singles-player-b-score">{this.playerTextCapitalized} B score</label>
                {this.renderScoreInput('singles-player-b-score', 'playerBScore', this.state.playerBScore)}
              </div>
            </div>
            <input className="button-primary" value="Register game" type="submit" onClick={this.registerGame} />
          </fieldset>
        </form>
      </section>
    );
  }

  renderPlayerSelect = (id, name, value) => {
    return (
      <select id={id} name={name} value={value} onChange={this.handleChange}>
        <option value="" disabled>Select {this.playerText}</option>
        {this.props.players.map(player =>
          <option key={player.id} value={player.id}>{player.name}</option>
        )}
      </select>
    );
  }

  renderScoreInput = (id, name, value) => {
    return (
      <input
        id={id}
        name={name}
        type="number"
        placeholder="0-10"
        min="0"
        max="10"
        value={value}
        onChange={this.handleChange}
      />
    );
  }

  handleChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  registerGame = (event) => {
    event.preventDefault();

    Api.addGame(this.props.type, this.state.playerAId, this.state.playerAScore, this.state.playerBId, this.state.playerBScore)
      .then(response => {
        this.setState({
          playerAScore: '',
          playerBScore: ''
        });
        this.props.callback();
      });
  }
}
