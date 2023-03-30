import React from 'react';

function Detail({ country, onBack }) {
  return (
    <div className="container">
      <button className="back-btn" onClick={onBack}>
        <i className="fa fa-arrow-left"></i> Back
      </button>
      <div className="detail-wrapper">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="detail-image"
        />
        <div className="detail-content">
          <h2 className="detail-title">{country.name.common}</h2>
          <div className="detail-info">
            <div>
              <strong>Capital:</strong> {country.capital}
            </div>
            <div>
              <strong>Population:</strong> {country.population}
            </div>
            <div>
              <strong>Region:</strong> {country.region}
            </div>
            <div>
              <strong>Subregion:</strong> {country.subregion}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;

 