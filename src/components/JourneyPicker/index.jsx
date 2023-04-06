import React, { useEffect, useState } from 'react';
import mapImage from './img/map.svg';
import { API_BASE_URL} from './../../index'
import './style.css';

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [date, setDate] = useState('')
  const [cities, setCities] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/cities`)
      .then((response) => response.json())
      .then((data) => setCities(data.results));
  }, [])
  

  const handleChangeFrom = (e) => {
    console.log(e.target.value)
    setFromCity(e.target.value)
  }

  const handleChangeTo = (e) => {
    console.log(e.target.value)
    setToCity(e.target.value)
  }

  const handleChangeDate = (e) => {
    console.log(e.target.value)
    setDate(e.target.value)
  }
  
  // onSubmit dat na formular, ne na tlacitko!!!!!!!!!!!!!!!!!!!!!
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${fromCity} -> ${toCity} on ${date}`);
  }

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select onChange={handleChangeFrom} value={fromCity}>
              <option value="">Vyberte</option>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select onChange={handleChangeTo} value={toCity}>
            <CityOptions cities={cities} />
              <option value="">Vyberte</option>
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select onChange={handleChangeDate} value={date}>
              <option value="">Vyberte</option>
              <option value="datum01">Datum 01</option>
              <option value="datum02">Datum 02</option>
              <option value="datum03">Datum 03</option>
              <option value="datum04">Datum 04</option>
              <option value="datum05">Datum 05</option>
            </select>
          </label>
          <div className="journey-picker__controls">
            <button 
              className="btn" 
              type="submit"
            > 
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src={mapImage} />
      </div>
    </div>
  )
};

const CityOptions = ({ cities }) => {
  return (
    <>
    {cities?.map((city) => <option key={city.code} value={city.code}>{city.name}</option>)}
    </>
  )
}