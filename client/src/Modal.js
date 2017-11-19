import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends PureComponent {
  constructor(props) {
    super(props);

    this.overlay = document.createElement('div');
    this.overlay.classList.add('modal-overlay');
    this.el = document.createElement('div');
    this.el.classList.add('modal-content');
  }

  componentDidMount() {
    modalRoot.appendChild(this.overlay);
    modalRoot.appendChild(this.el);

    document.addEventListener('keydown', this.handleKeyDown, { passive: true });
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    modalRoot.removeChild(this.overlay);

    document.removeEventListener('keydown', this.handleKeyDown, { passive: true });
  }

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}
