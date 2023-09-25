import React, { useEffect, useState } from 'react';
import Room from '../../Room/Room';
import { mainApi } from '../../../utils/MainApi';
import { useLocation } from 'react-router-dom';

function RoomsList({ onClick, onDelete, myRoom }) {
    const [test, setTest] = useState([])
    const location = useLocation()
    useEffect(() => {
        mainApi
            .getRooms()
            .then((rooms) => {
                setTest(rooms)
                // const test = rooms.filter(el => el.status === false)

            }).catch((err) => console.log(`Ошибка: ${err}`))
    }, [onDelete])
    return (
        <>
            {location.pathname === "/saved-rooms" ?
                <ul className="cards__list">
                    {myRoom.map((item) => (<Room room={item} key={item._id} onClick={onClick} onDelete={onDelete} />))}
                </ul>
                :
                <ul className="cards__list">
                    {test.map((item) => (<Room room={item} key={item._id} onClick={onClick} onDelete={onDelete} />))}
                </ul>}
        </>
    )
}

export default RoomsList;