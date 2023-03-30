// src/components/CountryList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setRegions([...new Set(data.map((country) => country.region))]);
      });
  }, []);

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .filter((country) => (selectedRegion ? country.region === selectedRegion : true));

  return (
    <div>
        <div className="container input-container">
            <div className="inputArea ">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#fff" }} /> 
                <input
                    type="text"
                    placeholder="Search for a country..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
            >
                <option value="">Filter By Regions</option>
                {regions.map((region) => (
                <option key={region} value={region}>
                    {region}
                </option>
                ))}
            </select>
        </div>
        <div className="container mt-3 justify-space-between country-grid">
            {filteredCountries.map((country) => (
            <div key={country.cca3} className="card">
                <Link to={`/country/${country.cca3}`} >
                    <img src={country.flags.png} alt={`${country.name.common} flag`} />
                    <div className="card-body">
                            <h2>{country.name.common}</h2>
                            <h3> Population : {country.population}</h3>
                            <h3> Region : {country.region}</h3>
                            <h3> Capital : {country.capital}</h3> 
                    </div> 
                </Link>
            </div>
            ))}
        </div>
    </div>
  );
};

export default CountryList;
