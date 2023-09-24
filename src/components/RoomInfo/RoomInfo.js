import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import "./RoomInfo.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Preloader from "../Preloader/Preloader";
import { mainApi } from '../../utils/MainApi';
import InfoTooltip from '../Popup/Popup';


function RoomInfo({ loggedIn, signOut, roomsAll, isAdmin, setMyRoom, myRoom, setRoomsAll, setRoomIdRes }) {
    const [roomInfo, setRoomInfo] = useState(null);
    const params = useParams();
    const [isSuccess, setIsSuccess] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const roomInfoId = roomsAll.find((room) => room.roomId === parseInt(params._id));
        // Здесь с сервера запросить мои номера  и положить в сет мои номера
        setRoomIdRes(params)
        setRoomInfo(roomInfoId);
    }, [params.id, roomsAll, setRoomInfo]);


    const reservedRoom = (roomId) => {
        const resRoom = roomsAll.find((room) => room._id === roomId)
        resRoom.status = false;
        mainApi
            .setRoomInfo(resRoom)
            .then((room) => {
                setIsSuccess(true)
                setIsOpen(true)
                setRoomsAll([...roomsAll, room])
            })
            .catch((err) => {
                setIsSuccess(false)
                setIsOpen(true)
                console.log(err)
            })
        // setMyRoom([...myRoom, resRoom])
    }

    const closedPopup = () => {
        setIsOpen(false)
        navigate("/saved-rooms", { replace: true })
    }

    return (<>
        <Header loggedIn={loggedIn} signOut={signOut} isAdmin={isAdmin} />
        {isOpen && <InfoTooltip isSuccess={isSuccess} isOpen={isOpen} onClose={closedPopup} />}
        {roomInfo ? (<><h2 className="title__text">Информация о номере</h2>
            <p>{roomInfo.name}</p>
            <article className='container'>
                <img src={roomInfo.image} alt={roomInfo.name} className="room__image" />
                <div className='description__container'>
                    <p className='description'>{roomInfo.description}</p>
                    {roomInfo.status === true && <button className='button' onClick={() => reservedRoom(roomInfo._id)}>Забронировать</button>}
                </div>

            </article>
        </>) : <Preloader />}
    </>

    )
}

export default RoomInfo;