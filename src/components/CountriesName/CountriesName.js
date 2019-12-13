import React from 'react';
import './CountriesName.css'
const CountriesName = (props) => {
    return (
        <div>
            <ul>
                <li>
                    <a href="#" onClick={props.info}>{props.countryName}</a>
                </li>
            </ul>
        </div>
    );
};

export default CountriesName;