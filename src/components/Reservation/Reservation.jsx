import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { API_BASE_URL} from './../../index';

export const Reservation = () => {
    const {id} = useParams()
    const [reservation, setReservation] = useState(null)

    useEffect(() => {
        fetch(`${API_BASE_URL}/reservation?id=${id}`)
          .then((response) => response.json())
          .then((data) => setReservation(data.results));
      }, [])

      console.log(reservation)

    //TODO: use the structure and styling from the design example
    return (
        <div className="reservation container">
            <h2>Vaše e-jízdenka č. {reservation?.reservationId}</h2>
            <p>{reservation?.fromCity.name} -- {reservation?.toCity.name}</p>
        </div>
    )
};