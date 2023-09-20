import React from 'react';
import planet from "../../images/logo_planet.png"
import "./Header.css";
import { Link, NavLink, useLocation } from 'react-router-dom';

function Header({ loggedIn, signOut, isAdmin }) {
    console.log(isAdmin)
    const location = useLocation();
    return (<header className='header'>
        <div className='header__container'>
            <img className='header__logo' src={planet} alt="Логотип в виде планеты" />
            <div >
                <h1 className='header__title'>Гостевой дом "Планета"</h1>
                <div className='header__nav'>
                    {isAdmin ? (<NavLink className={location.pathname === "/rooms" ? "header__link_active" : "header__link_not-active"}
                        to="/rooms">Номерной фонд</NavLink>) : (<NavLink className={location.pathname === "/saved-rooms" ? "header__button-active" : "header__link_not-active"}
                            to="/saved-rooms">Мои номера</NavLink>)}
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