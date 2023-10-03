import React from 'react';
import planet from "../../images/logo_planet.png"
import "./Header.css";
import { Link, NavLink, useLocation } from 'react-router-dom';
import ButtonToMain from '../ButtonToMain/ButtonToMain';

function Header({ loggedIn, signOut, isAdmin }) {
    const location = useLocation();
    return (<header className='header'>
        <div className='header__container'>
            {location.pathname === "/" ? (
                <img className='header__logo' src={planet} alt="Логотип в виде планеты" />
            ) : <ButtonToMain />}
            <div >
                <h1 className='header__title'>Гостевой дом "Планета"</h1>
                <div className='header__nav'>
                    {isAdmin ? (<NavLink className="header__nav_link"
                        to="/rooms">Номерной фонд</NavLink>) : (loggedIn ? <NavLink className="header__nav_link"
                            to="/saved-rooms">{location.pathname === "/saved-rooms" ? "" : "Мои номера"}</NavLink> : "")}
                </div>
            </div>
            {loggedIn ? (<div>
                <Link className='header__link' to="/signin" onClick={signOut}>Выйти</Link>

            </div>) : (<div className='link__container'>
                <Link className='header__link' to="/signup">Регистрация</Link>/
                <Link className='header__link' to="/signin">Войти</Link>
            </div>)}

        </div>
    </header >)
}

export default Header;