import React from 'react';

const CountryDetail = ({ country, onBack }) => {
    return (
        <div>           
            <h1>{country.name.common}</h1>
            <img src={country.flags.svg} alt = 'Flag'/>
            <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Subregion: {country.subregion}</p>
            <p>Languages: {Object.values(country.languages).join(', ')}</p>
            <p>Currencies: {Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
            <button onClick={onBack} className="btn btn-primary">Вернуться назад</button>
        </div>
    );
};

export default CountryDetail;
