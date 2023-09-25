import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import RoomsList from '../App/RoomsList/RoomsList';

function RoomsReservedUser({ roomsAll, signOut, isAdmin, loggedIn, onClick, onDelete, roomIdRes, currentUser, myRoom, check }) {
    const [myRoomVis, setMyRoomVis] = useState([]);

    useEffect(() => {
        console.log(myRoom)
        const resRoom = myRoom.filter((room) => room.owner === currentUser._id);
        setMyRoomVis(resRoom)
    }, [check, myRoom])

    return (
        <>
            <Header loggedIn={loggedIn} signOut={signOut} isAdmin={isAdmin} />
            <h2 className='title_panel'>Мои номера</h2>
            <RoomsList myRoom={myRoomVis} onClick={onClick} onDelete={onDelete} />

        </>
    )
}

export default RoomsReservedUser;