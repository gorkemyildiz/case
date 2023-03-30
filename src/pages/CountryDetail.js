import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CountryDetail = () => {
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const { cca3 } = useParams();
  const history = useHistory();

 useEffect(() => {
  fetch(`https://restcountries.com/v3.1/alpha/${cca3}`)
    .then((response) => response.json())
    .then((data) => {
      setCountry(data[0]);
      const borders = data[0].borders;
      
      if (borders) {
        Promise.all(
          borders.map((border) =>
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((response) => response.json())
              .then((data) => data[0])
          )
        ).then((data) => {
          setBorderCountries(data);
        });
      } else {
        setBorderCountries([]);
      }
    });
}, [cca3]);

  if (!country) {
    return <div>Loading...</div>;
  }

  const currencyNames = Object.values(country.currencies).map(
    (currency) => currency.name
  );

  const languageNames = country.languages ? Object.values(country.languages) : [];


  return (
    <div>
      <div className="container mt-2">
        <button onClick={() => history.goBack()} className="back-button"> 
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#fff" }} /> 
          <span>Back</span>
        </button>
      </div>
      <div className="detail-area container mt-3"> 
        <div className="detail-img-area">
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
            />
        </div>
        <div className="detail-container"> 
            <h2>{country.name.common}</h2>
            <div className="sub-container">
              <div className="sub-container-item">
                <span>
                    <b>Native Name :</b>{" "}
                    {country.nativeName
                      ? country.nativeName.eng.official
                      : country.name.common}
                  </span>
                  <span>
                    <b>Population :</b> {country.population}
                  </span>
                  <span>
                    <b>Region : </b> {country.region}
                  </span>
                  <span>
                    <b>Sub Region : </b> {country.subregion}
                  </span>
                  <span>
                    <b>Capital : </b> {country.capital}
                  </span>
              </div>
            <div className="sub-container-item">
                <span>
                  <b>Top Level Domain : </b> {country.tld}
                </span>
                <span>
                  <b>Currencies : </b> 
                  {currencyNames.length > 1 ? (
                    currencyNames.map((currencyName, index) => (
                      <span key={index}>{currencyName}, </span>
                    ))
                  ) : (
                    <span>{currencyNames[0]}</span>
                  )}
                </span>
                <span>
                        <b>Languages : </b>
                      {languageNames.length > 1 ? (
                    languageNames.map((languageName, index) => (
                      <span key={index}>{languageName}, </span>
                    ))
                  ) : (
                    <span>{languageNames[0]}</span>
                  )}
                </span> 
            </div>
          </div> 
          <div className="borders-area"> 
            <h3>Border Countries : </h3>  
            <div className="d-flex" style={{alignItems : 'center'}}>
                {borderCountries.length > 0 ? (
              borderCountries.map((borderCountry) => (
                    <div key={borderCountry.name.common} className="borders-item">
                      <span> 
                          {borderCountry.name.common} 
                      </span>
                    </div>
                  ))
                ) : (
                <span style={{marginLeft : '.2rem'}}> No border countries found.</span>
              )}
            </div>
          </div>
        </div>  
      </div>
    </div> 
  );
};

export default CountryDetail;