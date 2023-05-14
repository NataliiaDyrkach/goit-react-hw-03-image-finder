import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from '../styles.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickBackdrop = event => {
      if (event.target === event.currentTarget) {
          this.props.onClose();
    }
    
  };

  render() {
    const {currentImageUrl, currentImageDescription} = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleClickBackdrop}>
        <div className={css.Modal}>
          <img
            src={currentImageUrl}
            alt={currentImageDescription}
            loading="lazy"
          />
        </div>
       </div>,
        modalRoot
    );
  }
}


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    currentImageUrl: PropTypes.string,
    currentImageDescription: PropTypes.string,
};
  
export default Modal;
