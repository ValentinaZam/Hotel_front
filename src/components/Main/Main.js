import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Main.css"
import Preloader from "../Preloader/Preloader";
import RoomsList from "../RoomsList/RoomsList";
import planetMem from "../../images/planet_mem.png"
import { category } from "../../utils/const"
import { quantity } from "../../utils/const"
import Filter from "../Filter/Filter";


function Main({ loggedIn, signOut, roomsAll, onClick, isAdmin, onDelete }) {
    const [checkIsReserved, setCheckIsReserved] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDate2, setSelectedDate2] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState("")
    const [filterRooms, setFilterRooms] = useState([])

    useEffect(() => {
        if (roomsAll.length !== 0) {
            const check = roomsAll.some(el => el.status === true)
            setCheckIsReserved(check)
            setFilterRooms(filterRooms.length !== 0 ? filterRooms : roomsAll)
        }

    }, [roomsAll, filterRooms])

    const handleSelectChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    const handleSelectChangeQuantity = (e) => {
        setSelectedQuantity(e.target.value)
    };


    const handleFilterClick = () => {

        const filterByCategory = roomsAll.filter(room => room.category === selectedCategory)
        switch (selectedQuantity) {
            case '1':
                setFilterRooms(filterByCategory)
                break;
            case '2':
                const filter2 = filterByCategory.length !== 0 ?
                    filterByCategory.filter(room => room.category !== "одноместный") :
                    roomsAll.filter(room => room.category !== "одноместный")
                setFilterRooms(filter2)
                break;

            case '3':
            case '4':
                const filter3 = filterByCategory.length !== 0 ?
                    filterByCategory.filter(room => room.category === "семейный") :
                    roomsAll.filter(room => room.category === "семейный")
                setFilterRooms(filter3)
                break;
            default:
                setFilterRooms(filterByCategory)
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);

    };
    const handleDateChange2 = (e) => {
        setSelectedDate2(e.target.value);

    };

    return (
        <>
            <Header loggedIn={loggedIn} signOut={signOut} isAdmin={isAdmin} />
            <h2 className="title__text">Доступные номера</h2>
            <div className="sort__container">
                <Filter category={category} selectedCategory={selectedCategory} handleSelectChange={handleSelectChange} textCategory="Выберите категорию" />
                <Filter category={quantity} selectedCategory={selectedQuantity} handleSelectChange={handleSelectChangeQuantity} textCategory="Количество человек" />
                <div className="sort_box-data">
                    <p className="text_date">Дата заезда с</p>
                    <input className="sort"
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />

                    <p className="text_date">Дата выезда</p>
                    <input className="sort"
                        type="date"
                        value={selectedDate2}
                        onChange={handleDateChange2}
                    />
                </div>
                <button className="button__filtered" onClick={handleFilterClick}>Применить</button>
            </div >
            {
                roomsAll.length !== 0 ?
                    (checkIsReserved ?
                        <RoomsList myRoom={filterRooms} onClick={onClick} onDelete={onDelete} />
                        : <>
                            <p>ДОСТУПНЫХ НОМЕРОВ НЕТ, придётся спать на вокзале</p>
                            <img className="planet" src={planetMem} alt="Над вами тут стебутся" />
                        </>
                    )
                    :
                    <Preloader />
            }
        </>
    );
}

export default Main;
