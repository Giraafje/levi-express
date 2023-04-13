import React from 'react';
import {SeatRow} from './../SeatRow'
import './seatPicker.css';

// const testRow = [
//     {
//       number: 33,
//       isOccupied: false,
//     },
//     {
//       number: 29,
//       isOccupied: true,
//     },
//     {
//       number: 25,
//       isOccupied: false,
//     },
//   ];

export const SeatPicker = ({ seats, journeyId }) => {

    return (
        <div className="seat-picker container">
            <h2>Vyberte sedadlo</h2>
            <div className="seats">
                {seats.map((sr, index) => <SeatRow key={index} row={sr}/>)}
            </div>
        </div>
    )
};
