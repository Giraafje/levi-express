import React from 'react';
import {SeatRow} from './../SeatRow'
import './seatPicker.css';

export const SeatPicker = ({ seats, journeyId, selectedSeat, onSeatSelected }) => {

    return (
        <div className="seat-picker container">
            <h2>Vyberte sedadlo</h2>
            <div className="seats">
                {seats.map((sr, index) => <SeatRow 
                    key={index} 
                    row={sr} 
                    rowSelectedSeat={selectedSeat}
                    onSeatSelected={onSeatSelected}
                    />)}
            </div>
        </div>
    )
};
