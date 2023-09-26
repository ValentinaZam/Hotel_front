import React from 'react';
import Room from '../Room/Room';
import { useLocation } from 'react-router-dom';

function RoomsList({ onClick, onDelete, myRoom }) {
    const location = useLocation()

    return (
        <>
            {location.pathname === "/saved-rooms" ?
                <ul className="cards__list">
                    {myRoom.map((item) => (<Room room={item} key={item._id} onClick={onClick} onDelete={onDelete} />))}
                </ul>
                :
                <ul className="cards__list">
                    {myRoom.map((item) => (<Room room={item} key={item._id} onClick={onClick} onDelete={onDelete} />))}
                </ul>}
        </>
    )
}

export default RoomsList;