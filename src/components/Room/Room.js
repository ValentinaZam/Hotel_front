import React, { useEffect } from "react";
import "./Room.css";
import { Link, useLocation } from "react-router-dom";

function Room({ room, onClick, isLike, isReserved, onDelete }) {
    const location = useLocation();
    const isMainPage = location.pathname === "/"
    const isMyRoomsPage = location.pathname === "/saved-rooms"
    // console.log(room.roomId)

    useEffect(() => {

    }, [room.status])


    return (
        <>
            {room.status ?
                (isMyRoomsPage ? null : <li className="container__card">
                    <p>{room.name}</p>
                    <div className="card">
                        <img src={room.image} alt={room.name} className="card__image" />

                        {isMainPage && <Link to={`/rooms/${room.roomId}`}><button className="card__button">Открыть</button></Link>}
                    </div>
                </li>)
                :
                (isMainPage ? null : (isMyRoomsPage ? (<li className="container__card">
                    <p>{room.name}</p>
                    <div className="card">
                        <button className="card__delete-button" onClick={() => onDelete(room._id)}></button>
                        <img src={room.image} alt={room.name} className="card__image" />
                        <Link to={`/rooms/${room.roomId}`}><button className="card__button">Открыть</button></Link>
                    </div>
                </li>)
                    :
                    <li className="container__card">
                        <p>{room.name}</p>
                        <div className="card__container_reserved">
                            <img src={room.image} alt={room.name} className="card__reserved" />
                        </div>
                    </li>))}

        </>
    );
}

export default Room;