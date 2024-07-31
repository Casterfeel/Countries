import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryDetail from './CountryDetail'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                if (response.data && response.data.length > 0) {
                    setCountries(response.data);
                } else {
                    setError('Стран не найдено');
                }
            } catch (err) {
                setError('Ошибка получения данных: ' + (err.response ? err.response.data.message : err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
    };

    if (loading) return <div className="text-center"><p>Загрузка...</p></div>;
    if (error) return <div className="text-center text-danger"><p>{error}</p></div>;

    if (selectedCountry) {
        return (
            <CountryDetail country={selectedCountry} onBack={() => setSelectedCountry(null)} />
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Страны</h1>
            <div className="row">
                {countries.map(country => (
                    <div className="col-md-4 mb-4" key={country.cca3}>
                        <div className="card">
                            <img 
                            src={country.flags.svg} 
                            alt = 'Flag'
                            className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{country.name.common}</h5>
                                <p className="card-text">Population: {country.population}</p>
                                <p className="card-text">Region: {country.region}</p>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => handleCountryClick(country)}
                                >
                                    Узнать детали
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountryList;
