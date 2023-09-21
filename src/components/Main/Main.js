import React from "react";
import Header from "../Header/Header";

import "./Main.css"
import Room from "../Room/Room";
import Preloader from "../Preloader/Preloader";


function Main({ loggedIn, signOut, roomsAll, onClick, isAdmin }) {
    return (
        <>
            <Header loggedIn={loggedIn} signOut={signOut} isAdmin={isAdmin} />
            {roomsAll ? (<><h2 className="title__text">Доступные номера</h2>
                <ul className="cards__list">
                    {roomsAll.map((item) => (<Room room={item} key={item._id} onClick={onClick} />))}
                </ul> </>) : <Preloader />}
        </>
    );
}

export default Main;
