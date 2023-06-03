import Searchbar from './Searchbar';
import PropTypes from 'prop-types';
import '../styles.css';
import { Component } from 'react';
import { api } from 'api/api';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import Modal from './Modal';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      largeImageURL: '',
      tags: '',
      images: [],
      query: '',
      isLoading: false,
      error: null,
      page: 1,
      isModalOpen: false,
      scroll: -840,
    };
  }

  onInputChange = event => {
    this.setState({ query: event.target.value });
    this.setState({ page: 1 });
    this.setState({ scroll: -840 });
  };

  onFormSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      const images = await api.fetchImagesWithQuery(this.state.query);
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = async () => {
    this.setState({ isLoading: true });
    await this.setState(prevState => ({
      page: prevState.page + 1,
      scroll: prevState.scroll + 840,
    }));

    try {
      const images = await api.fetchMoreImages(
        this.state.query,
        this.state.page
      );
      this.setState({ images: [...this.state.images, ...images] });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  openModal = e => {
    const largeImageURL = e.currentTarget.dataset.src;
    const tags = e.currentTarget.getAttribute('alt');

    disableBodyScroll(document.body);
    this.setState({ largeImageURL, tags, isModalOpen: true });
  };

  closeModal = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      enableBodyScroll(document.body);
      this.setState({ isModalOpen: false });
      this.setState({ largeImageURL: '' });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.images !== this.state.images) {
      window.scrollTo(0, 50 + this.state.scroll);
    }

    const element = document.getElementById('kremowka');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  render() {
    const { isLoading } = this.props;
    return (
      <div className="App">
        <Searchbar
          onFormSubmit={this.onFormSubmit}
          onInputChange={this.onInputChange}
        />
        {this.state.isLoading ? (
          <>
            <ImageGallery
              openModal={this.openModal}
              images={this.state.images}
            />
            <Loader />
          </>
        ) : (
          <ImageGallery openModal={this.openModal} images={this.state.images} />
        )}
        {this.state.images.length > 0 && this.state.images.length % 12 === 0 ? (
          isLoading ? (
            ''
          ) : (
            <Button onLoadMore={this.onLoadMore} />
          )
        ) : (
          ''
        )}
        <Modal
          largeImageURL={this.state.largeImageURL}
          tags={this.state.tags}
          images={this.state.images}
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

App.propTypes = {
  onFormSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
};
