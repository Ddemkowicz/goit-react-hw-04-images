import React, { Component } from 'react';
import '../styles.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    const { image, openModal } = this.props;
    return (
      <li id={image.id} className="ImageGalleryItem">
        <img
          onClick={openModal}
          className="ImageGalleryItem-image"
          src={image.webformatURL}
          alt={image.tags}
          data-src={image.largeImageURL}
          loading="lazy"
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};
