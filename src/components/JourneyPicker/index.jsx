import React, { useEffect, useState } from 'react';
import mapImage from './img/map.svg';
import { API_BASE_URL} from './../../index';
import './style.css';

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [date, setDate] = useState('')
  const [cities, setCities] = useState([])
  const [dates, setDates] = useState([])

  useEffect(() => {

    fetch(`${API_BASE_URL}/cities`)
      .then((response) => response.json())
      .then((data) => setCities(data.results));

    fetch(`${API_BASE_URL}/dates`)
    .then((response) => response.json())
    .then((data) => setDates(data.results));

  }, [])

  const handleChangeFrom = (e) => {
    setFromCity(e.target.value)
  }

  const handleChangeTo = (e) => {
    setToCity(e.target.value)
  }

  const handleChangeDate = (e) => {
    setDate(e.target.value)
  }
  
  // onSubmit dat na formular, ne na tlacitko!!!!!!!!!!!!!!!!!!!!!
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${fromCity} -> ${toCity} on ${date}`);
    fetch(`${API_BASE_URL}/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}`)
      .then((response) => response.json())
      .then((data) => onJourneyChange(data));    
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
              <option value="">Vyberte</option>
              <CityOptions cities={cities} />  
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select onChange={handleChangeDate} value={date}>
              <option value="">Vyberte</option>
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button 
              className="btn" 
              type="submit"
              disabled={!fromCity || !toCity || !date}
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

const DatesOptions = ({ dates }) => {
  return (
    <>
    {dates?.map((date) => <option key={date.dateBasic} value={date.dateBasic}>{date.dateCs}</option>)}
    </>
  )
}