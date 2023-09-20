import React, { useEffect } from "react";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
import "./Main.css"
import Room from "../Room/Room";
import { Route } from "react-router-dom";
import RoomInfo from "../RoomInfo/RoomInfo";
// import roomsApi from "../../utils/api"

function Main({ loggedIn, signOut, roomsAll, onClick }) {
    useEffect(() => {
        console.log(roomsAll)
    }, [roomsAll])
    console.log(roomsAll)

    const handleIsLike = (movie) => {
        // if (!isMoviesSavedPage) {
        //   const savedMovie = savedMovies.find((film) => film.movieId === movie.id);
        //   return !!savedMovie;
        // }
        return true;
    };
    return (
        <>
            <Header loggedIn={loggedIn} signOut={signOut} />
            <h2 className="title__text">Доступные номера</h2>
            <ul className="cards__list">
                {roomsAll.map((item) => (<Room room={item} key={item._id} onClick={onClick} isLike={handleIsLike(item)} ></Room>))}
            </ul>

        </>
    );
}

export default Main;
