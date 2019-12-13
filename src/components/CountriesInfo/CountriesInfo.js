import React from 'react';
import './CountriesInfo.css'
const CountriesInfo = (props) => {
    return (
        <div className='countries_info'>
            <div className='info-div'>
            <h3>{props.countryName}</h3>
            <p><b>Capital: </b>{props.capital}</p>
            <p><b>Population: </b>{props.population}</p>
            </div>

            <div>
                <img src={props.flag} alt="flag"/>
            </div>
        </div>
    );
};

export default CountriesInfo;