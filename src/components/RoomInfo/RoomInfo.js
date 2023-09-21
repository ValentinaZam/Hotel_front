import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import "./RoomInfo.css"
import { useParams } from 'react-router-dom';
import Preloader from "../Preloader/Preloader";
import ButtonToMain from '../ButtonToMain/ButtonToMain';


function RoomInfo({ loggedIn, signOut, roomsAll, isAdmin }) {
    const [roomInfo, setRoomInfo] = useState(null);
    const params = useParams();
    // const roomInfoId = roomsAll.find(el => el.roomId === parseInt(params.id))
    useEffect(() => {
        const roomInfoId = roomsAll.find((room) => room.roomId === parseInt(params.id));
        setRoomInfo(roomInfoId);
    }, [params.id, roomsAll, setRoomInfo]);


    return (<>
        <Header loggedIn={loggedIn} signOut={signOut} isAdmin={isAdmin} />
        {roomInfo ? (<><h2 className="title__text">Информация о номере</h2>
            <p>{roomInfo.name}</p>
            <article className='container'>
                <img src={roomInfo.image} alt={roomInfo.name} className="room__image" />
                <div className='description__container'>
                    <p className='description'>{roomInfo.description}</p>
                    <button className='button'>Забронировать</button>
                </div>

            </article></>) : <Preloader />}
        {/* <ButtonToMain /> */}
    </>

    )
}

export default RoomInfo;