import React, {Component, Fragment} from 'react';
import CountriesName from "./components/CountriesName/CountriesName";
import CountriesInfo from "./components/CountriesInfo/CountriesInfo";
import Borders from "./components/Borders/Borders";
import axios from 'axios'

class App extends Component {
    state = {
        countries: [],
        countryName: '',
        capital: '',
        population: 0,
        flag: '',
        borders: null,
    };
   async componentDidMount() {
        const response = await axios.get('https://restcountries.eu/rest/v2/all?fields=name;alpha3Code');
        const country = response.data;
       const alpha = country.reduce((set, countryName)=> {
            set.add(countryName.alpha3Code)
            return set
        }, new Set());
       const countriesName = {};
       for (const code of alpha) {
           const response = await axios.get('https://restcountries.eu/rest/v2/alpha/' + code);
           countriesName[code] = response.data;
       }

       const countries = country.map(countryName => {
           return {
               ...countryName,
               name: countriesName[countryName.alpha3Code].name
           }
       });
        this.setState({countries});
   }
   countryInfo = async name => {
        const response = await axios.get('https://restcountries.eu/rest/v2/name/' + name);
        const country = response.data;
        const countryBorder = [];
        for (let i = 0; i < country[0].borders.length; i++) {
            const result = await axios.get('https://restcountries.eu/rest/v2/alpha/' + country[0].borders[i]);
            countryBorder.push(result.data.name)
        }
       await this.setState({
            countryName: country[0].name,
            capital: country[0].capital,
            population: country[0].population,
            flag: country[0].flag,
            borders: countryBorder,
        });
   };
    render() {
        return (
            <Fragment>
                <div className='main-block'>
            <div  className='countries_name-block'>
                {this.state.countries.map((country, index)=>(
                    <CountriesName key={index} countryName={country.name} info={()=>this.countryInfo(country.name)}/>
                ))}
            </div>
            <div className='countries_info-block'>
                {this.state.capital ?
                <CountriesInfo
                    countryName={this.state.countryName}
                    capital={this.state.capital}
                    population={this.state.population}
                    flag={this.state.flag}
                /> : 'Пожалуйста, выберите страну'

                }
                {this.state.borders !== null ?  <Borders borders={this.state.borders}/> : null}
            </div>
                </div>
            </Fragment>
        );
    }
}

export default App;