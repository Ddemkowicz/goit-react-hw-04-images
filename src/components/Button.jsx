import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  przewinDoElementu = () => {
    const element = document.getElementById('idElementu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  render() {
    const { onLoadMore } = this.props;
    return (
      <div className="container">
        <button id="kremowka" onClick={onLoadMore} className="Button">
          Load more
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
