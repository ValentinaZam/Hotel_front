import React from "react";
import Header from "../Header/Header";

import "./Main.css"
// import Room from "../Room/Room";
import Preloader from "../Preloader/Preloader";
import RoomsList from "../App/RoomsList/RoomsList";


function Main({ loggedIn, signOut, roomsAll, onClick, isAdmin, onDelete }) {
    return (
        <>
            <Header loggedIn={loggedIn} signOut={signOut} isAdmin={isAdmin} />
            <h2 className="title__text">Доступные номера</h2>
            {roomsAll ? (<RoomsList roomsAll={roomsAll} onClick={onClick} onDelete={onDelete} />) : <Preloader />}
        </>
    );
}

export default Main;
