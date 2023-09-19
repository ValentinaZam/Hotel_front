import React from "react";
import "./Room.css";
import { Link, useLocation } from "react-router-dom";

function Room({ room, onClick, isLike }) {
    const location = useLocation();
    const isMoviesSavedPage = location.pathname === "/saved-movies";
    const handleClick = () => {
        onClick(room)
    };

    return (
        <>
            <li className="container__card">
                <p>{room.name}</p>
                <div className="card">
                    <img src={room.image} alt={room.name} className="card__image" />
                    {/* <button className="card__button">Открыть</button> */}
                    {location.pathname === "/" && <Link to={`/rooms/${room.roomId}`}><button className="card__button">Открыть</button></Link>}
                </div>
            </li>
        </>
    );
}

export default Room;