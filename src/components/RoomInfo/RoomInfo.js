import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import "./RoomInfo.css"
import { useNavigate, useParams } from 'react-router-dom';
import Preloader from "../Preloader/Preloader";
import { mainApi } from '../../utils/MainApi';
import InfoTooltip from '../Popup/Popup';


function RoomInfo({ loggedIn, signOut, roomsAll, isAdmin, currentUser, setRoomsAll, setRoomIdRes }) {
    const [roomInfo, setRoomInfo] = useState(null);
    const params = useParams();
    const [isSuccess, setIsSuccess] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        const roomInfoId = roomsAll.find((room) => room.roomId === parseInt(params._id));
        setRoomIdRes(params)
        setRoomInfo(roomInfoId);
    }, [currentUser]);

    const reservedRoom = (roomId) => {
        if (loggedIn) {
            const resRoom = roomsAll.find((room) => room._id === roomId)
            resRoom.status = false;
            resRoom.owner = currentUser._id
            if (resRoom) {
                mainApi
                    .setRoomInfo(resRoom)
                    .then((room) => {
                        setIsSuccess(true)
                        setIsOpen(true)

                    })
                    .catch((err) => {
                        setIsSuccess(false)
                        setIsOpen(true)
                        console.log(err)
                    })
            }
        } else {
            alert("Необходима авторизация")
        }

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
                    {roomInfo.status === true && !isAdmin && <button className='button' onClick={() => reservedRoom(roomInfo._id)}>Забронировать</button>}
                </div>

            </article>
        </>) : <Preloader />}
    </>
    )
}

export default RoomInfo;