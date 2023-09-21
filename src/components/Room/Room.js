import React from "react";
import "./Room.css";
import { Link, useLocation } from "react-router-dom";

function Room({ room, onClick, isLike, isReserved }) {
    const location = useLocation();
    const isMainPage = location.pathname === "/"

    return (
        <>
            {room.status ?
                (<li className="container__card">
                    <p>{room.name}</p>
                    <div className="card">
                        <img src={room.image} alt={room.name} className="card__image" />

                        {isMainPage && <Link to={`/rooms/${room.roomId}`}><button className="card__button">Открыть</button></Link>}
                    </div>
                </li>)
                :
                (isMainPage ? null : (<li className="container__card">
                    <p>{room.name}</p>
                    <div className="card__container_reserved">
                        <img src={room.image} alt={room.name} className="card__reserved" />
                        <p></p>
                    </div>
                </li>))}

        </>
    );
}

export default Room;