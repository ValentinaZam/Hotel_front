import React from 'react';
import Header from '../Header/Header';
import Room from '../Room/Room';
import "./RoomInfo.css"
import { useParams } from 'react-router-dom';


function RoomInfo({ loggedIn, signOut, roomsAll }) {
    const params = useParams();
    const roomInfoId = roomsAll.find(el => el.roomId === parseInt(params.id))
    return (
        <>
            <Header loggedIn={loggedIn} signOut={signOut} />
            <h2 className="title__text">Информация о номере</h2>

            <article className='container'>
                <ul className='room'><Room room={roomInfoId} /></ul>
                <p className='description'>{roomInfoId.description}</p>
            </article>

        </>
    )
}

export default RoomInfo;