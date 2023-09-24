import React, { useEffect, useState } from 'react';
import Room from '../../Room/Room';
import { mainApi } from '../../../utils/MainApi';

function RoomsList({ onClick, onDelete }) {
    const [test, setTest] = useState([])
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

            <ul className="cards__list">
                {test.map((item) => (<Room room={item} key={item._id} onClick={onClick} onDelete={onDelete} />))}
            </ul>
        </>
    )
}

export default RoomsList;