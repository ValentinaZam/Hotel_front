import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Room from '../Room/Room';
import RoomsList from '../App/RoomsList/RoomsList';
import { mainApi } from '../../utils/MainApi';
import { useParams } from 'react-router-dom';

function RoomsReservedUser({ roomsAll, signOut, isAdmin, loggedIn, onClick, onDelete, roomIdRes }) {
    const [userId, setUserId] = useState(null)
    useEffect(() => {

        // if (roomIdRes) {
        //     const resRoom = roomsAll.find((room) => room.roomId === roomIdRes._id);
        //     mainApi
        //         .addSaveRoom(resRoom)
        //         .then((data) => console.log(data))
        //         .catch(err => console.log(err))
        // }


    }, [roomIdRes])

    return (
        <>
            <Header loggedIn={loggedIn} signOut={signOut} isAdmin={isAdmin} />
            <h2 className='title_panel'>Мои номера</h2>
            <RoomsList roomsAll={roomsAll} onClick={onClick} onDelete={onDelete} />

        </>
    )
}

export default RoomsReservedUser;