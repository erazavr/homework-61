import React from 'react';

const Borders = (props) => {
    return (
        <ul> <b>Borders with: </b>
            {props.borders.map((border, index) => {
                return (
                    <li key={index}>{border}</li>
                )
            })}
        </ul>
    );
};

export default Borders;