import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = props => {
  const { image, openModal } = props;
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
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

const ImageGallery = props => {
  const { images, openModal } = props;

  return (
    <>
      <ul className="ImageGallery">
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            openModal={openModal}
            image={image}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
