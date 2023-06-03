import '../styles.css';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { api } from 'api/api';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import Modal from './Modal';
import Searchbar from './Searchbar';

const App = props => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(-840);

  const onInputChange = e => {
    setQuery(e.target.value);
    setScroll(-840);
  };

  const onFormSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newImages = await api.fetchImagesWithQuery(query);
      setImages(newImages);
      console.log(newImages);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoadMore = async () => {
    setIsLoading(true);
    setPage(page + 1);
    setScroll(scroll + 840);
    try {
      const newImages = await api.fetchMoreImages(query, page);
      setImages(images.concat(newImages));
      console.log(newImages);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = e => {
    const largeImageURL = e.currentTarget.dataset.src;
    const tags = e.currentTarget.getAttribute('alt');

    disableBodyScroll(document.body);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      enableBodyScroll(document.body);
      setIsModalOpen(false);
      setLargeImageURL('');
    }
  };

  const prevImagesRef = useRef();

  useEffect(() => {
    const prevImages = prevImagesRef.current;
    console.log(prevImages);
    if (prevImages !== undefined && prevImages !== images) {
      window.scrollTo(0, 50 + scroll);
    }

    const element = document.getElementById('kremowka');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    prevImagesRef.current = images;
  }, [images, scroll]);

  return (
    <div className="App">
      <Searchbar onFormSubmit={onFormSubmit} onInputChange={onInputChange} />
      {isLoading ? (
        <>
          <ImageGallery openModal={openModal} images={images} />
          <Loader />
        </>
      ) : (
        <ImageGallery openModal={openModal} images={images} />
      )}
      {images.length > 0 && images.length % 12 === 0 ? (
        <Button onLoadMore={onLoadMore} />
      ) : (
        ''
      )}
      <Modal
        largeImageURL={largeImageURL}
        tags={tags}
        images={images}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

App.propTypes = {
  onFormSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
};

export default App;
