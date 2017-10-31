import React, { PureComponent } from 'react';
import './Modal.css';

export default class Modal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <div>
        <div className="modal-overlay"></div>
        <div className="modal-content">
          <div className="modal-close">
            <button className="button button-clear" onClick={this.handleClose}>Close</button>
          </div>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }

  handleClose() {
    this.setState({ visible: false });
  }
}
