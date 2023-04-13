import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { JourneyPicker } from '../JourneyPicker';
import { JourneyDetail } from '../JourneyDetail';
import { SeatPicker } from '../SeatPicker';
import { API_BASE_URL} from './../../index';
import './home.css'

export const Home = () => {
  const navigate = useNavigate()
  const [journey, setJourney] = useState(null)
  const [userSeat, setUserSeat] = useState(null)

  const handleJourneyChange = (journeyData) => {
    setJourney(journeyData);
  }

  const handleBuy = () => {
    fetch(`${API_BASE_URL}/reservation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'create',
        seat: userSeat,
        journeyId: journey.results.journeyId,
      }),
    })
    .then((response) => response.json())
    .then((data) => navigate(`/reservation/${data.results.reservationId}`))
  }

  const handleSelect = (seatNumber) => {
    setUserSeat(seatNumber)
  }

  return (
    <main style={{margin: 'auto'}}>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey?.status === "success" ? (
        <>
          <p>Nalezeno spojení s id <b>{journey.results.journeyId}</b>.</p>
          <JourneyDetail journey={journey.results} />
          <SeatPicker 
            seats={journey.results.seats} 
            journeyId={journey.results.journeyId} 
            selectedSeat={userSeat}
            onSeatSelected={handleSelect}
            />
          <div className="controls container">
            <button className="btn btn--big" type="button" onClick={handleBuy}>Rezervovat</button>
          </div>
        </>
        ) : null}
    </main>
  )
};
