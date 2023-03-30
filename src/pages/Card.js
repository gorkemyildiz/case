import React from 'react';

function Card({ country, onClick }) {
  return (
    <div onClick={() => onClick(country)}>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
      />
      <div>{country.name.common}</div>
    </div>
  );
}

export default Card;
