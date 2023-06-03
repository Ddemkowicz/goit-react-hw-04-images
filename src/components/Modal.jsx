import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = props => {
  const { closeModal, largeImageURL, tags, isModalOpen } = props;

  useEffect(() => {
    const closeModal = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, []);

  return (
    <div
      onClick={closeModal}
      className={`Overlay ${isModalOpen ? '' : 'modalNone'}`}
    >
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default Modal;
