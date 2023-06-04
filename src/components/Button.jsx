import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { onLoadMore, id } = props;
  return (
    <div className="container">
      <button id={id} onClick={onLoadMore} className="Button">
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
