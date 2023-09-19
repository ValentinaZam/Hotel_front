import React from "react";
import "./Room.css";
import { useLocation } from "react-router-dom";

function Room({ room, onClick, isLike }) {
    const location = useLocation();
    const isMoviesSavedPage = location.pathname === "/saved-movies";
    const handleClick = () => {
        onClick(room)
    };

    // const movieImage = isMoviesSavedPage
    //     ? room.image
    //     : `https://api.nomoreparties.co/${movie.image.url}`;

    // const buttonImages = () => {
    //     if (location.pathname === "/movies") return (isLike ? "card__like-button--active" : "card__like-button");
    //     if (location.pathname === "/saved-movies") return "card__delete-button";
    // }

    return (
        <>
            <li className="container__card">
                <p>{room.name}</p>
                <div className="card">
                    <img src={room.image} alt={room.name} className="card__image" />
                    <button className="card__button">Открыть</button>

                </div>
            </li>
        </>
    );
}

export default Room;