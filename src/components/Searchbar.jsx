import '../styles.css';
import React from 'react';
import PropTypes from 'prop-types';

const Searchbar = props => {
  const { onFormSubmit, onInputChange } = props;

  return (
    <div>
      <header className="Searchbar">
        <form onSubmit={onFormSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="lupa">🔍</span>
          </button>

          <input
            onChange={onInputChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
};

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Searchbar;
