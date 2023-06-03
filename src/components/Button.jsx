import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { onLoadMore } = props;
  return (
    <div className="container">
      <button id="kremowka" onClick={onLoadMore} className="Button">
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
