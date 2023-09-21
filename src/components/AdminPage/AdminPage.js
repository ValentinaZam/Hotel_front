import React from 'react';
import Header from '../Header/Header';
import Room from '../Room/Room';
import "./AdminPage.css"

function AdminPage({ loggedIn, signOut, roomsAll, isAdmin, isReserved }) {
    return (<>
        <Header loggedIn={loggedIn} signOut={signOut} isAdmin={isAdmin} />
        <h2 className='title_panel'>Панель администратора</h2>
        <p>Статус номеров</p>
        <div className='list__container'>
            <ul className='rooms__list'>
                {roomsAll.map((item) => (<Room room={item} key={item._id} isReserved={isReserved} />))}
            </ul>
        </div>

    </>)
}

export default AdminPage;