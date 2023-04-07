import React, { useState } from 'react';
import { JourneyPicker } from '../JourneyPicker';
import { JourneyDetail } from '../JourneyDetail';

export const Home = () => {
  const [journey, setJourney] = useState(null)

  const handleJourneyChange = (journeyData) => {
    setJourney(journeyData);
    console.log(journeyData);
  }

  return (
    <main style={{margin: 'auto'}}>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey?.status === "success" ? <p>Nalezeno spojení s id <b>{journey.results.journeyId}</b>.</p> : null}
      {journey?.status === "success" ? <JourneyDetail journey={journey.results} /> : null}
    </main>
  )
};
