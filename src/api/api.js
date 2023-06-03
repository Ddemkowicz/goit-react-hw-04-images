import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '35091080-36e54d1ab1b489bab378e0aed';

const fetchImagesWithQuery = async searchQuery => {
  const response = axios.get(
    `${URL}?q=${searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return (await response).data.hits;
};

const fetchMoreImages = async (searchQuery, page) => {
  const response = axios.get(
    `${URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return (await response).data.hits;
};

export const api = {
  fetchImagesWithQuery,
  fetchMoreImages,
};
