import P from 'prop-types';

import React from 'react';
import './styles.css';

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <>
      <div className="header">
        <div className="logo">
          Coda<span>Dev</span>
        </div>

        <div className="search-bar">
          <input
            className="text-input"
            onChange={handleChange}
            value={searchValue}
            type="search"
            placeholder="Type your search"
          />
        </div>
      </div>
      <hr />
    </>
  );
};

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
